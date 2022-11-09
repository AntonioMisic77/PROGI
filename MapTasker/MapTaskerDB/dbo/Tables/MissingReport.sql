CREATE TABLE [dbo].[MissingReport]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [OIB] BIGINT NOT NULL, 
    [Photo] NVARCHAR(MAX) NOT NULL, 
    [Description] NVARCHAR(MAX) NULL, 
    [ReportedAt] DATETIME NOT NULL, 
    [FoundAt] DATETIME NULL
)
