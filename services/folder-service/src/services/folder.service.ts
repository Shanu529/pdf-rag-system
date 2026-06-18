import prisma from "../lib/prisma.ts";

export const createFolderService = async (name: string, userId: string) => {
  const folder = await prisma.folder.create({
    data: {
      name,
      userId, //
    },
  });
  return folder;
};

export const deleteFolderService = async (id: string, userId: string) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!folder) {
    throw new Error("Folder not found");
  }

  await prisma.folder.delete({
    where: {
      id,
    },
  });

  return {
    success: true,
    message: "Folder deleted successfully",
    data: folder,
  };
};


export const getAllFoldersService = async (userId: string) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return folders;
};
