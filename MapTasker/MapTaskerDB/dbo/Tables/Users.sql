CREATE TABLE [dbo].[Users] (
    [Username] NVARCHAR (50) NULL,
    [OIB]  BIGINT           NOT NULL,
    [FirstName] NVARCHAR(50) NOT NULL, 
    [LastName] NVARCHAR(50) NOT NULL, 
    [Photo] NVARCHAR(MAX) NULL, 
    [PhoneNumber] NVARCHAR(20) NOT NULL, 
    [EMail] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(MAX) NOT NULL, 
    [RoleId] INT NOT NULL, 
    [Confirmed] BIT NOT NULL, 
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([OIB] ASC),
    CONSTRAINT [FK_RoleId] FOREIGN KEY (RoleID) REFERENCES Role(Id)
);

