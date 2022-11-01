CREATE TABLE [dbo].[MissingReport]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [OIB] NVARCHAR(50) NOT NULL, 
    [Photo] NVARCHAR(MAX) NOT NULL, 
    [Description] NVARCHAR(MAX) NULL
)
