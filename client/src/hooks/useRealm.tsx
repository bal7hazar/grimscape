import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { REALM_ID } from "@/dojo/constants";

export const useRealm = () => {
  const {
    setup: {
      clientModels: {
        models: { Realm },
        classes: { Realm: RealmClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(REALM_ID)]) as Entity,
    [],
  );
  const component = useComponentValue(Realm, key);
  const realm = useMemo(() => {
    return component ? new RealmClass(component) : null;
  }, [component]);

  return { realm, key };
};
