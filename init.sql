create table Categories
(
    Id   int identity
        primary key,
    Name nvarchar(255) not null
)
go

SET IDENTITY_INSERT dbo.Categories ON;

INSERT INTO dbo.Categories (Id, Name) VALUES (1, N'Languages');
INSERT INTO dbo.Categories (Id, Name) VALUES (26, N'Thomsa');
SET IDENTITY_INSERT dbo.Categories OFF;


create table Flexworkers
(
    Id                int identity
        primary key,
    Name              nvarchar(255) not null,
    Address           nvarchar(255),
    DateOfBirth       date,
    Email             nvarchar(255),
    PhoneNumber       nvarchar(20),
    ProfilePictureUrl nvarchar(255)
)
go

create table JobSkill
(
    JobsId   int not null
        constraint FK_JobSkill_Jobs
            references Jobs,
    SkillsId int not null
        constraint FK_JobSkill_Skills
            references Skills,
    constraint PK_JobSkill
        primary key (JobsId, SkillsId)
)
go

create table Jobs
(
    Id          int identity
        primary key,
    Address     nvarchar(255),
    Description nvarchar(max),
    MinHours    int,
    MaxHours    int,
    StartDate   date,
    EndDate     date,
    Name        nvarchar(255) not null
)
go
create table FlexworkerSkill
(
    FlexworkersId int not null
        constraint FK_FlexworkerSkill_Flexworkers
            references Flexworkers,
    SkillsId      int not null
        constraint FK_FlexworkerSkill_Skills
            references Skills,
    constraint PK_FlexworkerSkill
        primary key (FlexworkersId, SkillsId)
)
go



create table Skills
(
    Id         int identity
        primary key,
    CategoryId int
        constraint FK_Skills_Categories
            references Categories,
    Name       nvarchar(255) not null
)
go

SET IDENTITY_INSERT dbo.Skills ON;

INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (1, 1, N'English Proficiency');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (2, 1, N'Spanish Fluency');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (3, 1, N'Mandarin Communication');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (4, 1, N'French Translation');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (5, 1, N'German Writing');

SET IDENTITY_INSERT dbo.Skills OFF;

create table Preferences
(
    Id         int identity
        constraint PK_Preferences
            primary key,
    SkillId    int not null
        constraint FK_Preferences_Skills_SkillId
            references Skills
            on delete cascade,
    JobId      int not null
        constraint FK_Preferences_Jobs_JobId
            references Jobs
            on delete cascade,
    IsRequired bit not null,
    Weight     int not null
)
go

create index IX_Preferences_JobId
    on Preferences (JobId)
go

create index IX_Preferences_SkillId
    on Preferences (SkillId)
go

SET IDENTITY_INSERT dbo.Preferences ON;

SET IDENTITY_INSERT dbo.Preferences OFF;