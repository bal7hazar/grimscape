import { Adventurer } from "../containers/Adventurer";
import { Interaction } from "../containers/Interaction";
import { Mobs } from "../containers/Mobs";

export const Overlay = () => {
  return (
    <div className="absolute top-16 left-0 w-full">
      <Interaction />
      <Adventurer />
      <Mobs />
    </div>
  );
};
