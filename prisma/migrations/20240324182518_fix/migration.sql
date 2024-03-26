/*
  Warnings:

  - You are about to drop the column `albums` on the `Favs` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Favs` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `Favs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favs" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- CreateTable
CREATE TABLE "_ArtistToFavs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AlbumToFavs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavsToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToFavs_AB_unique" ON "_ArtistToFavs"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToFavs_B_index" ON "_ArtistToFavs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFavs_AB_unique" ON "_AlbumToFavs"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToFavs_B_index" ON "_AlbumToFavs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavsToTrack_AB_unique" ON "_FavsToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_FavsToTrack_B_index" ON "_FavsToTrack"("B");

-- AddForeignKey
ALTER TABLE "_ArtistToFavs" ADD CONSTRAINT "_ArtistToFavs_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToFavs" ADD CONSTRAINT "_ArtistToFavs_B_fkey" FOREIGN KEY ("B") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavs" ADD CONSTRAINT "_AlbumToFavs_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToFavs" ADD CONSTRAINT "_AlbumToFavs_B_fkey" FOREIGN KEY ("B") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavsToTrack" ADD CONSTRAINT "_FavsToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavsToTrack" ADD CONSTRAINT "_FavsToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
