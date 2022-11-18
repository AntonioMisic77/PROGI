CREATE TABLE [dbo].[Point]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Latitude] FLOAT NOT NULL, 
    [Longitude] FLOAT NOT NULL, 
    [AreaId] INT NOT NULL, 
    [OrderNumber] INT NOT NULL,
    CONSTRAINT [FKAreaId] FOREIGN KEY (AreaId) REFERENCES Area(Id)
)
