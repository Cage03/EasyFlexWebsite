create table Categories
(
    Id   int identity
        primary key,
    Name nvarchar(255) not null
)
go

INSERT INTO dbo.Categories (Id, Name) VALUES (1, N'Languages');
INSERT INTO dbo.Categories (Id, Name) VALUES (26, N'Thomsa');


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

INSERT INTO dbo.Flexworkers (Id, Name, Address, DateOfBirth, Email, PhoneNumber, ProfilePictureUrl) VALUES (1, N'John Doe', N'123 Main St', N'1990-01-01', N'janedoe@example.comd-', N'+12345678901', N'https://example.com/profile.jpg');

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

INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (1, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1732798291499');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (2, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733303645662');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (3, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733304361212');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (4, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315664117');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (5, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315676527');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (6, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315679437');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (7, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315705310');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (8, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315707024');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (9, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315719750');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (10, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315741168');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (11, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315742841');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (12, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315743924');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (13, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315764607');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (14, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315766122');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (15, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315791118');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (16, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315826810');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (17, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315844025');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (18, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733315872979');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (19, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733317822609');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (20, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733318038838');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (21, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733912231565');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (22, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733912251694');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (23, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733912964689');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (24, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733913038865');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (27, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733913339583');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (29, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733922714923');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (31, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733922927399');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (33, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733925055898');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (35, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733992356721');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (36, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733992651518');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (37, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733992651518');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (40, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733992957011');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (47, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733993449830');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (49, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733993514490');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (51, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733994230174');
INSERT INTO dbo.Jobs (Id, Address, Description, MinHours, MaxHours, StartDate, EndDate, Name) VALUES (54, N'123 Main Street', N'This is a test job description.', 10, 40, N'2024-12-01', N'2024-12-31', N'TestJob1_1733995590170');


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

INSERT INTO dbo.FlexworkerSkill (FlexworkersId, SkillsId) VALUES (1, 1);
INSERT INTO dbo.FlexworkerSkill (FlexworkersId, SkillsId) VALUES (1, 2);


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

INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (1, 1, N'English Proficiency');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (2, 1, N'Spanish Fluency');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (3, 1, N'Mandarin Communication');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (4, 1, N'French Translation');
INSERT INTO dbo.Skills (Id, CategoryId, Name) VALUES (5, 1, N'German Writing');


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

INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (1, 1, 1, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (2, 2, 1, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (3, 3, 2, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (4, 4, 2, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (5, 5, 3, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (6, 1, 4, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (7, 2, 5, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (8, 3, 6, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (9, 4, 7, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (10, 5, 8, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (11, 1, 9, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (12, 2, 10, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (13, 3, 11, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (14, 4, 12, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (15, 5, 13, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (16, 1, 14, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (17, 2, 15, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (18, 3, 16, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (19, 4, 17, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (20, 5, 18, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (21, 1, 19, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (22, 2, 20, 0, 50);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (23, 3, 21, 1, 100);
INSERT INTO dbo.Preferences (Id, SkillId, JobId, IsRequired, Weight) VALUES (24, 4, 22, 0, 50