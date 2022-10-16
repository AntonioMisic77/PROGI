CREATE TABLE [dbo].[Users] (
    [Name] NVARCHAR (50) NULL,
    [OIB]  INT           NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([OIB] ASC)
);

