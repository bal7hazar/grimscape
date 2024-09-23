import { useMemo } from "react";
import { Account } from "@/ui/components/Account";
import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/elements/sheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faXTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Button } from "../elements/button";
import { User } from "lucide-react";
import logo from "/assets/logo.png"
import { motion } from "framer-motion";
import { Signup } from "../actions/Signup";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";

export const Header = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account?.address || "0x0" });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  const position = useMemo(() => {
    if (!adventurer || adventurer.isDead()) return { x: 0, y: 320 };
    return { x: 0, y: 20};
  }, [adventurer]);

  const links = useMemo(
    () => [
      {
        name: "Github",
        url: "https://github.com/bal7hazar/grimscape",
        icon: faGithub,
      },
      {
        name: "Twitter",
        url: "https://x.com/nafnlaust_gg",
        icon: faXTwitter,
      },
      {
        name: "Discord",
        url: "https://discord.gg/realmsworld",
        icon: faDiscord,
      },
    ],
    [],
  );

  return (
    <div className="h-16 w-full flex justify-between items-center px-8 py-2">
      <p className="text-4xl font-bold">Grimscape</p>
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={position}
        transition={{ type: "spring", stiffness: 30 }}
        className="absolute top-0 left-1/2"
        style={{ zIndex: 1000 }}
      >
        <div className="relative overflow-visible">
          <img src={logo} alt="Grimscape" className="h-24 w-24 -translate-x-1/2" />
        </div>
      </motion.div>
      <div className="flex gap-4 items-center">
        {!!player && (
          <p className="font-['Norse'] text-2xl max-w-44 truncate">
            {player.name}
          </p>
        )}
        {/* <Leaderboard /> */}
        <Sheet>
          <SheetTrigger asChild className="cursor-pointer">
            <Button variant="outline" size="icon">
              <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              <span className="sr-only">Open settings</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle className="text-3xl">Settings</SheetTitle>
              <SheetDescription className="font-['Norse'] text-xl">
                Manage your account and preferences
              </SheetDescription>
              <div className="flex flex-col gap-8 py-8">
                <div className="flex flex-col gap-2 items-start">
                  <p className="text-2xl">Account</p>
                  <Account />
                </div>
              </div>
            </SheetHeader>
            <SheetFooter>
              <div className="w-full flex justify-center gap-8">
                {links.map((link, index) => (
                  <a
                    key={index}
                    className="flex justify-center items-center hover:scale-105 duration-200"
                    href={link.url}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={link.icon as any} className="h-6" />
                  </a>
                ))}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
