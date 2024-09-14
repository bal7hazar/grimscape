import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/ui/elements/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/elements/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/elements/pagination";
import { Button } from "@/ui/elements/button";
import { Game } from "@/dojo/game/models/game";
import { useGames } from "@/hooks/useGames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faCrown,
  faMedal,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { usePlayer } from "@/hooks/usePlayer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";

const GAME_PER_PAGE = 5;
const MAX_PAGE_COUNT = 5;

export const Leaderboard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trophy className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center text-2xl">
          <DialogTitle className="text-3xl">Leaderboard</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="m-auto">
          <Content />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Content = () => {
  const { games } = useGames();
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  const sorteds = useMemo(() => {
    return games
      .sort((a, b) => b.action - a.action)
      .sort((a, b) => b.gold - a.gold)
      .sort((a, b) => b.score - a.score)
      .filter((game) => !!game.score);
  }, [games]);

  useEffect(() => {
    const rem = Math.floor(sorteds.length / (GAME_PER_PAGE + 1)) + 1;
    setPageCount(rem);
  }, [sorteds]);

  const { start, end } = useMemo(() => {
    const start = (page - 1) * GAME_PER_PAGE;
    const end = start + GAME_PER_PAGE;
    return { start, end };
  }, [page]);

  const handlePrevious = useCallback(() => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  }, [page]);

  const handleNext = useCallback(() => {
    if (page === Math.min(pageCount, MAX_PAGE_COUNT)) return;
    setPage((prev) => prev + 1);
  }, [page, pageCount]);

  const disabled = useMemo(() => sorteds.length > 0, [sorteds]);

  return (
    <>
      <Table className="text-lg font-['Norse']">
        <TableCaption className={`${disabled && "hidden"}`}>
          Leaderbord
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[50px]">
              <FontAwesomeIcon icon={faMedal} className="text-slate-500" />
            </TableHead>
            <TableHead className="text-center w-[50px]">
              <FontAwesomeIcon icon={faCrown} className="text-yellow-500" />
            </TableHead>
            <TableHead className="text-center w-[50px]">
              <FontAwesomeIcon icon={faCoins} className="text-slate-300" />
            </TableHead>
            <TableHead className="text-left">
              <FontAwesomeIcon icon={faUser} className="text-slate-500" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorteds.slice(start, end).map((game, index) => (
            <Row
              key={index}
              rank={(page - 1) * GAME_PER_PAGE + index + 1}
              game={game}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination className={`${!disabled && "hidden"}`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${page === 1 && "opacity-50"}`}
              onClick={handlePrevious}
            />
          </PaginationItem>
          {Array.from({ length: Math.min(pageCount, MAX_PAGE_COUNT) }).map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === page}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              className={`${page === Math.min(pageCount, MAX_PAGE_COUNT) && "opacity-50"}`}
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export const Row = ({ rank, game }: { rank: number; game: Game }) => {
  const { player } = usePlayer({ playerId: game.player_id });
  return (
    <TableRow>
      <TableCell>{`# ${rank}`}</TableCell>
      <TableCell className="text-right">
        <p className="flex gap-1 justify-center items-center">
          <span className="font-bold">{game.score}</span>
        </p>
      </TableCell>
      <TableCell className="text-right">
        <p className="flex gap-1 justify-center items-center">
          <span className="font-bold">{game.gold}</span>
        </p>
      </TableCell>
      <TableCell className="text-left max-w-36 truncate">
        {player?.name || "-"}
      </TableCell>
    </TableRow>
  );
};
