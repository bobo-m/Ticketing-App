import options from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import React from "react";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const session = await getServerSession(options);
  if (!session || session.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin Role Required</p>;
  }
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!user) {
    return <p className="text-destructive">User Not Found</p>;
  }
  user.password = "";
  return <UserForm user={user} />;
};

export default EditUser;
