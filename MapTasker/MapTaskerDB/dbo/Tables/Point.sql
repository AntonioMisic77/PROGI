CREATE TABLE [dbo].[Point]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [XCoordinate] FLOAT NOT NULL, 
    [YCoordinate] FLOAT NOT NULL, 
    [AreaId] INT NOT NULL, 
    [OrderNumber] INT NOT NULL,
    CONSTRAINT [FKAreaId] FOREIGN KEY (AreaId) REFERENCES Area(Id)
)
