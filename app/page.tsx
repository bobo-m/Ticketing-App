import DashChart from "@/components/DashChart";
import DashRecentTickets from "@/components/DashRecentTickets";
import prisma from "@/prisma/db";
import React from "react";

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTickets = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTickets.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
