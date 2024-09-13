// Core imports

use core::Zeroable;
use core::NumericLiteral;
use core::debug::PrintTrait;

// Internal imports

use grimscape::helpers::math::Math;

mod errors {
    const PACKER_ELEMENT_IS_MISSING: felt252 = 'Packer: element is missing';
}

trait PackerTrait<T, U, V> {
    fn get(packed: T, index: u8, size: V) -> U;
    fn set(packed: T, index: u8, size: V, value: U) -> T;
    fn contains(packed: T, value: U, size: V) -> bool;
    fn unpack(packed: T, size: V) -> Array<U>;
    fn remove_at(packed: T, index: U, size: V) -> T;
    fn remove(packed: T, item: U, size: V) -> T;
    fn replace(packed: T, index: u8, size: V, value: U) -> T;
    fn pack(unpacked: Array<U>, size: V) -> T;
}

impl Packer<
    T,
    U,
    V,
    +Into<U, T>,
    +Into<u8, T>,
    +Into<T, u256>,
    +TryInto<T, U>,
    +TryInto<u256, T>,
    +NumericLiteral<T>,
    +PartialEq<T>,
    +Zeroable<T>,
    +Rem<T>,
    +Add<T>,
    +Sub<T>,
    +Mul<T>,
    +Div<T>,
    +BitAnd<T>,
    +BitNot<T>,
    +Drop<T>,
    +Copy<T>,
    +PartialEq<U>,
    +Drop<U>,
    +Copy<U>,
    +Into<V, T>,
    +Drop<V>,
    +Copy<V>,
> of PackerTrait<T, U, V> {
    fn get(packed: T, index: u8, size: V) -> U {
        let mask: T = Math::fast_power(2_u8.into(), size.into()) - 1_u8.into();
        let offset: T = Math::fast_power(2_u8.into(), index.into() * size.into());
        ((packed & (mask * offset)) / offset).try_into().unwrap()
    }

    fn set(mut packed: T, index: u8, size: V, value: U) -> T {
        let mask: T = Math::fast_power(2_u8.into(), size.into()) - 1_u8.into();
        let offset: T = Math::fast_power(2_u8.into(), index.into() * size.into());
        (packed & ~(mask * offset)) + (value.into() * offset)
    }

    fn contains(mut packed: T, value: U, size: V) -> bool {
        let modulo: T = Math::fast_power(2_u8.into(), size.into());
        let mut index = 0;
        loop {
            if packed.is_zero() {
                break false;
            }
            let raw: U = (packed % modulo).try_into().unwrap();
            if value == raw.into() {
                break true;
            }
            packed = packed / modulo;
            index += 1;
        }
    }

    fn unpack(mut packed: T, size: V) -> Array<U> {
        let mut result: Array<U> = array![];
        let modulo: T = Math::fast_power(2_u8.into(), size.into());
        let mut index = 0;
        loop {
            if packed.is_zero() {
                break;
            }
            let value: U = (packed % modulo).try_into().unwrap();
            result.append(value);
            packed = packed / modulo;
            index += 1;
        };
        result
    }

    fn remove(mut packed: T, item: U, size: V) -> T {
        // [Compute] Loop over the packed value and remove the value at the given index
        let mut removed = false;
        let mut result: Array<U> = array![];
        let modulo: T = Math::fast_power(2_u8.into(), size.into());
        loop {
            if packed.is_zero() {
                break;
            }
            let value: U = (packed % modulo).try_into().unwrap();
            if value != item {
                result.append(value);
            } else {
                removed = true;
            }
            packed = packed / modulo;
        };
        // [Check] Index not out of bounds
        assert(removed, errors::PACKER_ELEMENT_IS_MISSING);
        // [Return] The new packed value and the removed value
        Self::pack(result, size)
    }

    fn remove_at(mut packed: T, index: U, size: V) -> T {
        // [Compute] Mask
        let upper_offset: T = Math::fast_power(
            2_u8.into(), (index.into() + 1_u8.into()) * size.into()
        );
        let lower_offset: T = Math::fast_power(2_u8.into(), index.into() * size.into());
        packed / upper_offset * lower_offset + packed % lower_offset
    }

    fn replace(mut packed: T, index: u8, size: V, value: U) -> T {
        // [Compute] Mask
        let mut mask: T = Math::fast_power(2_u8.into(), size.into()) - 1_u8.into();
        let offset: T = Math::fast_power(2_u8.into(), index.into() * size.into());
        mask = mask * offset;

        // [Compute] Add the new value at the given index
        (packed & ~mask) + (value.into() * offset)
    }

    fn pack(mut unpacked: Array<U>, size: V) -> T {
        let mut result: T = Zeroable::zero();
        let mut modulo: T = Math::fast_power(2_u8.into(), size.into());
        let mut offset: T = 1_u8.into();
        loop {
            match unpacked.pop_front() {
                Option::Some(value) => {
                    result = result + offset.into() * value.into();
                    if unpacked.is_empty() {
                        break;
                    }
                    offset = offset * modulo;
                },
                Option::None => { break; }
            }
        };

        result
    }
}

#[cfg(test)]
mod tests {
    // Core imports

    use core::debug::PrintTrait;

    // Local imports

    use super::Packer;

    #[test]
    fn test_packer_replace() {
        let packed: u64 = 0xab0598c6fe1234d7;
        let index: u8 = 8;
        let size: u8 = 4;
        let value: u8 = 0xa;
        let new_packed = Packer::replace(packed, index, size, value);
        assert_eq!(new_packed, 0xab0598cafe1234d7);
    }

    #[test]
    fn test_packer_remove() {
        let packed: u64 = 0xab0598c6fe1234d7;
        let item: u8 = 0x6;
        let size: u8 = 4;
        let new_packed = Packer::remove(packed, item, size);
        assert_eq!(new_packed, 0xab0598cfe1234d7);
    }

    #[test]
    fn test_packer_remove_at() {
        let packed: u64 = 0xab0598c6fe1234d7;
        let index: u8 = 8;
        let size: u8 = 4;
        let new_packed = Packer::remove_at(packed, index, size);
        assert_eq!(new_packed, 0xab0598cfe1234d7);
    }
}
