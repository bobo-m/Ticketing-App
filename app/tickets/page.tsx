import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";

interface SearchParms {
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParms }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const ticketCount = await prisma.ticket.count();
  return (
    <div>
      <Link
        href={"/tickets/new"}
        className={buttonVariants({ variant: "default" })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
