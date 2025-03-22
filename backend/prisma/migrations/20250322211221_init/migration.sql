/*
  Warnings:

  - Added the required column `prompt` to the `conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversation" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "response" TEXT NOT NULL;
