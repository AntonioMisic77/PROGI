CREATE TABLE [dbo].[Region]
(
	[AreaId] INT NOT NULL PRIMARY KEY,
    [OperationId] INT NOT NULL, 
    CONSTRAINT [FKRegionId] FOREIGN KEY (AreaId) REFERENCES Area(Id),
    CONSTRAINT [OperationId] FOREIGN KEY (OperationId) REFERENCES Operation(Id)
)
