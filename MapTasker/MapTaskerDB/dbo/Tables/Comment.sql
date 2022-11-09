CREATE TABLE [dbo].[Comment]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ReportId] INT NOT NULL,
    [Text] NVARCHAR(MAX) NOT NULL, 
    [UserOIB] BIGINT NULL,
    CONSTRAINT [FK_ReportId] FOREIGN KEY (ReportId) REFERENCES MissingReport(Id)
)
