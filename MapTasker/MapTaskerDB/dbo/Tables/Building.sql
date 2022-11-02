CREATE TABLE [dbo].[Building]
(
	[AreaId] INT NOT NULL PRIMARY KEY, 
    [BlockId] INT NOT NULL, 
    [Status] NVARCHAR(50) NOT NULL,
    CONSTRAINT [FK_BuildingId] FOREIGN KEY (AreaId) REFERENCES Area(Id),
    CONSTRAINT [FK_BuildingBlockId] FOREIGN KEY (BlockId) REFERENCES Block(AreaId),
)
