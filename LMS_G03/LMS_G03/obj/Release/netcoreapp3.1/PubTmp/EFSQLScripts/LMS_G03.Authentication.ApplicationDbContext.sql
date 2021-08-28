IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetRoles] (
        [Id] nvarchar(450) NOT NULL,
        [Name] nvarchar(256) NULL,
        [NormalizedName] nvarchar(256) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetUsers] (
        [Id] nvarchar(450) NOT NULL,
        [UserName] nvarchar(256) NULL,
        [NormalizedUserName] nvarchar(256) NULL,
        [Email] nvarchar(256) NULL,
        [NormalizedEmail] nvarchar(256) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetRoleClaims] (
        [Id] int NOT NULL IDENTITY,
        [RoleId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetUserClaims] (
        [Id] int NOT NULL IDENTITY,
        [UserId] nvarchar(450) NOT NULL,
        [ClaimType] nvarchar(max) NULL,
        [ClaimValue] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetUserLogins] (
        [LoginProvider] nvarchar(450) NOT NULL,
        [ProviderKey] nvarchar(450) NOT NULL,
        [ProviderDisplayName] nvarchar(max) NULL,
        [UserId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
        CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetUserRoles] (
        [UserId] nvarchar(450) NOT NULL,
        [RoleId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
        CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE TABLE [AspNetUserTokens] (
        [UserId] nvarchar(450) NOT NULL,
        [LoginProvider] nvarchar(450) NOT NULL,
        [Name] nvarchar(450) NOT NULL,
        [Value] nvarchar(max) NULL,
        CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
        CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]) WHERE [NormalizedName] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210810174210_Init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210810174210_Init', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetRoleClaims] DROP CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserClaims] DROP CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserLogins] DROP CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserTokens] DROP CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserTokens] DROP CONSTRAINT [PK_AspNetUserTokens];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserRoles] DROP CONSTRAINT [PK_AspNetUserRoles];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserLogins] DROP CONSTRAINT [PK_AspNetUserLogins];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetUserClaims] DROP CONSTRAINT [PK_AspNetUserClaims];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetRoles] DROP CONSTRAINT [PK_AspNetRoles];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [AspNetRoleClaims] DROP CONSTRAINT [PK_AspNetRoleClaims];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetUserTokens]', N'UserTokens';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetUserRoles]', N'UserRoles';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetUserLogins]', N'UserLogins';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetUserClaims]', N'UserClaims';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetRoles]', N'Roles';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[AspNetRoleClaims]', N'RoleClaims';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[UserRoles].[IX_AspNetUserRoles_RoleId]', N'IX_UserRoles_RoleId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[UserLogins].[IX_AspNetUserLogins_UserId]', N'IX_UserLogins_UserId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[UserClaims].[IX_AspNetUserClaims_UserId]', N'IX_UserClaims_UserId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    EXEC sp_rename N'[RoleClaims].[IX_AspNetRoleClaims_RoleId]', N'IX_RoleClaims_RoleId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserTokens] ADD CONSTRAINT [PK_UserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserRoles] ADD CONSTRAINT [PK_UserRoles] PRIMARY KEY ([UserId], [RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserLogins] ADD CONSTRAINT [PK_UserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserClaims] ADD CONSTRAINT [PK_UserClaims] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [Roles] ADD CONSTRAINT [PK_Roles] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [RoleClaims] ADD CONSTRAINT [PK_RoleClaims] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    CREATE TABLE [Users] (
        [Id] nvarchar(450) NOT NULL,
        [UserName] nvarchar(max) NULL,
        [NormalizedUserName] nvarchar(max) NULL,
        [Email] nvarchar(max) NULL,
        [NormalizedEmail] nvarchar(max) NULL,
        [EmailConfirmed] bit NOT NULL,
        [PasswordHash] nvarchar(max) NULL,
        [SecurityStamp] nvarchar(max) NULL,
        [ConcurrencyStamp] nvarchar(max) NULL,
        [PhoneNumber] nvarchar(max) NULL,
        [PhoneNumberConfirmed] bit NOT NULL,
        [TwoFactorEnabled] bit NOT NULL,
        [LockoutEnd] datetimeoffset NULL,
        [LockoutEnabled] bit NOT NULL,
        [AccessFailedCount] int NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [RoleClaims] ADD CONSTRAINT [FK_RoleClaims_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserClaims] ADD CONSTRAINT [FK_UserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserLogins] ADD CONSTRAINT [FK_UserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserRoles] ADD CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Roles] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserRoles] ADD CONSTRAINT [FK_UserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    ALTER TABLE [UserTokens] ADD CONSTRAINT [FK_UserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134042_DbTest2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210814134042_DbTest2', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserClaims] DROP CONSTRAINT [FK_UserClaims_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserLogins] DROP CONSTRAINT [FK_UserLogins_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserRoles] DROP CONSTRAINT [FK_UserRoles_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserTokens] DROP CONSTRAINT [FK_UserTokens_AspNetUsers_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    DROP TABLE [AspNetUsers];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'UserName');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Users] ALTER COLUMN [UserName] nvarchar(256) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'NormalizedUserName');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Users] ALTER COLUMN [NormalizedUserName] nvarchar(256) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'NormalizedEmail');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Users] ALTER COLUMN [NormalizedEmail] nvarchar(256) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Email');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [Users] ALTER COLUMN [Email] nvarchar(256) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    CREATE INDEX [EmailIndex] ON [Users] ([NormalizedEmail]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    CREATE UNIQUE INDEX [UserNameIndex] ON [Users] ([NormalizedUserName]) WHERE [NormalizedUserName] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserClaims] ADD CONSTRAINT [FK_UserClaims_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserLogins] ADD CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserRoles] ADD CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    ALTER TABLE [UserTokens] ADD CONSTRAINT [FK_UserTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210814134459_DbTest3')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210814134459_DbTest3', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816083345_DbTest4')
BEGIN
    CREATE TABLE [UserInfo] (
        [Id] nvarchar(450) NOT NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [BirthDay] nvarchar(max) NULL,
        [Nationality] nvarchar(max) NULL,
        [LivingCity] nvarchar(max) NULL,
        [BirthCity] nvarchar(max) NULL,
        CONSTRAINT [PK_UserInfo] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_UserInfo_Users_Id] FOREIGN KEY ([Id]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816083345_DbTest4')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210816083345_DbTest4', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816180954_DbTest5')
BEGIN
    CREATE TABLE [Category] (
        [CategoryId] nvarchar(450) NOT NULL,
        [CategoryName] nvarchar(max) NULL,
        [CategoryShortDetail] nvarchar(max) NULL,
        CONSTRAINT [PK_Category] PRIMARY KEY ([CategoryId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816180954_DbTest5')
BEGIN
    CREATE TABLE [Course] (
        [CourseId] nvarchar(450) NOT NULL,
        [CourseName] nvarchar(max) NULL,
        [CourseShortDetail] nvarchar(max) NULL,
        [CreatedDate] datetime2 NOT NULL,
        [UpdatedDate] datetime2 NOT NULL,
        [CategoryId] nvarchar(450) NULL,
        CONSTRAINT [PK_Course] PRIMARY KEY ([CourseId]),
        CONSTRAINT [FK_Course_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([CategoryId]) ON DELETE SET NULL
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816180954_DbTest5')
BEGIN
    CREATE INDEX [IX_Course_CategoryId] ON [Course] ([CategoryId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816180954_DbTest5')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210816180954_DbTest5', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    ALTER TABLE [Users] ADD [Role] nvarchar(max) NOT NULL DEFAULT N'';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    ALTER TABLE [Users] ADD [Degree] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Course]') AND [c].[name] = N'UpdatedDate');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Course] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [Course] ALTER COLUMN [UpdatedDate] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Course]') AND [c].[name] = N'CreatedDate');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Course] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [Course] ALTER COLUMN [CreatedDate] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    CREATE TABLE [CourseOffering] (
        [SectionId] nvarchar(450) NOT NULL,
        [Year] nvarchar(max) NULL,
        [Term] nvarchar(max) NULL,
        [StartDate] nvarchar(max) NULL,
        [EndDate] nvarchar(max) NULL,
        [CourseId] nvarchar(450) NULL,
        [Id] nvarchar(450) NULL,
        CONSTRAINT [PK_CourseOffering] PRIMARY KEY ([SectionId]),
        CONSTRAINT [FK_CourseOffering_Course_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Course] ([CourseId]) ON DELETE NO ACTION,
        CONSTRAINT [FK_CourseOffering_Users_Id] FOREIGN KEY ([Id]) REFERENCES [Users] ([Id]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    CREATE UNIQUE INDEX [IX_CourseOffering_CourseId] ON [CourseOffering] ([CourseId]) WHERE [CourseId] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    CREATE INDEX [IX_CourseOffering_Id] ON [CourseOffering] ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210816185044_DbTest6')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210816185044_DbTest6', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817034514_TestDb6')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210817034514_TestDb6', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [CourseOffering] DROP CONSTRAINT [FK_CourseOffering_Course_CourseId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [CourseOffering] DROP CONSTRAINT [FK_CourseOffering_Users_Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [RoleClaims] DROP CONSTRAINT [FK_RoleClaims_Roles_RoleId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserClaims] DROP CONSTRAINT [FK_UserClaims_Users_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserInfo] DROP CONSTRAINT [FK_UserInfo_Users_Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserLogins] DROP CONSTRAINT [FK_UserLogins_Users_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRoles] DROP CONSTRAINT [FK_UserRoles_Roles_RoleId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRoles] DROP CONSTRAINT [FK_UserRoles_Users_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserTokens] DROP CONSTRAINT [FK_UserTokens_Users_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    DROP INDEX [IX_CourseOffering_CourseId] ON [CourseOffering];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserTokens] DROP CONSTRAINT [PK_UserTokens];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [Users] DROP CONSTRAINT [PK_Users];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRoles] DROP CONSTRAINT [PK_UserRoles];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserLogins] DROP CONSTRAINT [PK_UserLogins];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserClaims] DROP CONSTRAINT [PK_UserClaims];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [Roles] DROP CONSTRAINT [PK_Roles];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [RoleClaims] DROP CONSTRAINT [PK_RoleClaims];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Role');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [Users] DROP COLUMN [Role];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Degree');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [Users] DROP COLUMN [Degree];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserTokens]', N'UserToken';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[Users]', N'User';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserRoles]', N'UserRole';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserLogins]', N'UserLogin';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserClaims]', N'UserClaim';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[Roles]', N'Role';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[RoleClaims]', N'RoleClaim';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserRole].[IX_UserRoles_RoleId]', N'IX_UserRole_RoleId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserLogin].[IX_UserLogins_UserId]', N'IX_UserLogin_UserId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[UserClaim].[IX_UserClaims_UserId]', N'IX_UserClaim_UserId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    EXEC sp_rename N'[RoleClaim].[IX_RoleClaims_RoleId]', N'IX_RoleClaim_RoleId', N'INDEX';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserToken] ADD CONSTRAINT [PK_UserToken] PRIMARY KEY ([UserId], [LoginProvider], [Name]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [User] ADD CONSTRAINT [PK_User] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRole] ADD CONSTRAINT [PK_UserRole] PRIMARY KEY ([UserId], [RoleId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserLogin] ADD CONSTRAINT [PK_UserLogin] PRIMARY KEY ([LoginProvider], [ProviderKey]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserClaim] ADD CONSTRAINT [PK_UserClaim] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [Role] ADD CONSTRAINT [PK_Role] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [RoleClaim] ADD CONSTRAINT [PK_RoleClaim] PRIMARY KEY ([Id]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    CREATE TABLE [Enroll] (
        [UserId] nvarchar(450) NOT NULL,
        [CourseId] nvarchar(450) NOT NULL,
        [EnrollDate] nvarchar(max) NULL,
        CONSTRAINT [PK_Enroll] PRIMARY KEY ([UserId], [CourseId]),
        CONSTRAINT [FK_Enroll_Course_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Course] ([CourseId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Enroll_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    CREATE TABLE [Lecture] (
        [LectureId] nvarchar(450) NOT NULL,
        [LectureName] nvarchar(max) NULL,
        [LectureDetail] nvarchar(max) NULL,
        [LectureDate] nvarchar(max) NULL,
        [LectureTime] nvarchar(max) NULL,
        [CourseId] nvarchar(450) NULL,
        CONSTRAINT [PK_Lecture] PRIMARY KEY ([LectureId]),
        CONSTRAINT [FK_Lecture_Course_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Course] ([CourseId]) ON DELETE SET NULL
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    CREATE INDEX [IX_CourseOffering_CourseId] ON [CourseOffering] ([CourseId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    CREATE INDEX [IX_Enroll_CourseId] ON [Enroll] ([CourseId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    CREATE INDEX [IX_Lecture_CourseId] ON [Lecture] ([CourseId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [CourseOffering] ADD CONSTRAINT [FK_CourseOffering_Course_CourseId] FOREIGN KEY ([CourseId]) REFERENCES [Course] ([CourseId]) ON DELETE SET NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [CourseOffering] ADD CONSTRAINT [FK_CourseOffering_User_Id] FOREIGN KEY ([Id]) REFERENCES [User] ([Id]) ON DELETE NO ACTION;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [RoleClaim] ADD CONSTRAINT [FK_RoleClaim_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserClaim] ADD CONSTRAINT [FK_UserClaim_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserInfo] ADD CONSTRAINT [FK_UserInfo_User_Id] FOREIGN KEY ([Id]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserLogin] ADD CONSTRAINT [FK_UserLogin_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRole] ADD CONSTRAINT [FK_UserRole_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserRole] ADD CONSTRAINT [FK_UserRole_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    ALTER TABLE [UserToken] ADD CONSTRAINT [FK_UserToken_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210817175652_DbTest7')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210817175652_DbTest7', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseOffering]') AND [c].[name] = N'Term');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [CourseOffering] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [CourseOffering] ALTER COLUMN [Term] int NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    ALTER TABLE [CourseOffering] ADD [SectionName] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    ALTER TABLE [Course] ADD [CoourseImg] varbinary(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    ALTER TABLE [Course] ADD [CourseShortName] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    ALTER TABLE [Category] ADD [CategoryShortName] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818083127_DbTest8')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210818083127_DbTest8', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    DECLARE @var9 sysname;
    SELECT @var9 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lecture]') AND [c].[name] = N'LectureTime');
    IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [Lecture] DROP CONSTRAINT [' + @var9 + '];');
    ALTER TABLE [Lecture] DROP COLUMN [LectureTime];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    DECLARE @var10 sysname;
    SELECT @var10 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseOffering]') AND [c].[name] = N'SectionName');
    IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [CourseOffering] DROP CONSTRAINT [' + @var10 + '];');
    ALTER TABLE [CourseOffering] DROP COLUMN [SectionName];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    DECLARE @var11 sysname;
    SELECT @var11 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Course]') AND [c].[name] = N'CourseShortName');
    IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [Course] DROP CONSTRAINT [' + @var11 + '];');
    ALTER TABLE [Course] DROP COLUMN [CourseShortName];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    DECLARE @var12 sysname;
    SELECT @var12 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Category]') AND [c].[name] = N'CategoryShortName');
    IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [Category] DROP CONSTRAINT [' + @var12 + '];');
    ALTER TABLE [Category] DROP COLUMN [CategoryShortName];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    ALTER TABLE [Lecture] ADD [LectureDuration] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    ALTER TABLE [CourseOffering] ADD [SectionCode] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    ALTER TABLE [Course] ADD [CourseCode] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    ALTER TABLE [Category] ADD [CategoryCode] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818084614_DbTest9')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210818084614_DbTest9', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    ALTER TABLE [Enroll] DROP CONSTRAINT [FK_Enroll_Course_CourseId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    ALTER TABLE [Enroll] DROP CONSTRAINT [PK_Enroll];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    DROP INDEX [IX_Enroll_CourseId] ON [Enroll];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    DECLARE @var13 sysname;
    SELECT @var13 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Enroll]') AND [c].[name] = N'CourseId');
    IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Enroll] DROP CONSTRAINT [' + @var13 + '];');
    ALTER TABLE [Enroll] DROP COLUMN [CourseId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    ALTER TABLE [Enroll] ADD [SectionId] nvarchar(450) NOT NULL DEFAULT N'';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    ALTER TABLE [Enroll] ADD CONSTRAINT [PK_Enroll] PRIMARY KEY ([UserId], [SectionId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    CREATE INDEX [IX_Enroll_SectionId] ON [Enroll] ([SectionId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    ALTER TABLE [Enroll] ADD CONSTRAINT [FK_Enroll_CourseOffering_SectionId] FOREIGN KEY ([SectionId]) REFERENCES [CourseOffering] ([SectionId]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210818193422_DbTest10')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210818193422_DbTest10', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [CourseOffering] DROP CONSTRAINT [FK_CourseOffering_User_Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [UserInfo] DROP CONSTRAINT [FK_UserInfo_User_Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [UserInfo] DROP CONSTRAINT [PK_UserInfo];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    DROP INDEX [IX_CourseOffering_Id] ON [CourseOffering];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    DECLARE @var14 sysname;
    SELECT @var14 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[UserInfo]') AND [c].[name] = N'Id');
    IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [UserInfo] DROP CONSTRAINT [' + @var14 + '];');
    ALTER TABLE [UserInfo] DROP COLUMN [Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    DECLARE @var15 sysname;
    SELECT @var15 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseOffering]') AND [c].[name] = N'Id');
    IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [CourseOffering] DROP CONSTRAINT [' + @var15 + '];');
    ALTER TABLE [CourseOffering] DROP COLUMN [Id];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [UserInfo] ADD [UserId] nvarchar(450) NOT NULL DEFAULT N'';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [User] ADD [UserId] nvarchar(450) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [CourseOffering] ADD [TeacherId] nvarchar(450) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [UserInfo] ADD CONSTRAINT [PK_UserInfo] PRIMARY KEY ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    CREATE UNIQUE INDEX [IX_User_UserId] ON [User] ([UserId]) WHERE [UserId] IS NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    CREATE INDEX [IX_CourseOffering_TeacherId] ON [CourseOffering] ([TeacherId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [CourseOffering] ADD CONSTRAINT [FK_CourseOffering_User_TeacherId] FOREIGN KEY ([TeacherId]) REFERENCES [User] ([Id]) ON DELETE NO ACTION;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    ALTER TABLE [User] ADD CONSTRAINT [FK_User_UserInfo_UserId] FOREIGN KEY ([UserId]) REFERENCES [UserInfo] ([UserId]) ON DELETE NO ACTION;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819075509_DbTest11')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210819075509_DbTest11', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819080706_DbTest12')
BEGIN
    DROP INDEX [IX_User_UserId] ON [User];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819080706_DbTest12')
BEGIN
    CREATE INDEX [IX_User_UserId] ON [User] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210819080706_DbTest12')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210819080706_DbTest12', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    DECLARE @var16 sysname;
    SELECT @var16 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lecture]') AND [c].[name] = N'LectureDuration');
    IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Lecture] DROP CONSTRAINT [' + @var16 + '];');
    ALTER TABLE [Lecture] DROP COLUMN [LectureDuration];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    ALTER TABLE [Lecture] ADD [Description] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    ALTER TABLE [Lecture] ADD [Document] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    ALTER TABLE [CourseOffering] ADD [Document] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    ALTER TABLE [CourseOffering] ADD [FolderId] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    ALTER TABLE [Course] ADD [CourseDocument] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824073735_DbTest14')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210824073735_DbTest14', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824081205_DbTest15')
BEGIN
    ALTER TABLE [Course] ADD [FolderId] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824081205_DbTest15')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210824081205_DbTest15', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [Lecture] DROP CONSTRAINT [FK_Lecture_Course_CourseId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    DROP INDEX [IX_Lecture_CourseId] ON [Lecture];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    DECLARE @var17 sysname;
    SELECT @var17 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Lecture]') AND [c].[name] = N'CourseId');
    IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [Lecture] DROP CONSTRAINT [' + @var17 + '];');
    ALTER TABLE [Lecture] DROP COLUMN [CourseId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    DECLARE @var18 sysname;
    SELECT @var18 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[CourseOffering]') AND [c].[name] = N'FolderId');
    IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [CourseOffering] DROP CONSTRAINT [' + @var18 + '];');
    ALTER TABLE [CourseOffering] DROP COLUMN [FolderId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    DECLARE @var19 sysname;
    SELECT @var19 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Course]') AND [c].[name] = N'FolderId');
    IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [Course] DROP CONSTRAINT [' + @var19 + '];');
    ALTER TABLE [Course] DROP COLUMN [FolderId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [Lecture] ADD [LectureFolderId] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [Lecture] ADD [SectionId] nvarchar(450) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [CourseOffering] ADD [SectionFolderId] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [Course] ADD [CourseFolderId] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    CREATE INDEX [IX_Lecture_SectionId] ON [Lecture] ([SectionId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    ALTER TABLE [Lecture] ADD CONSTRAINT [FK_Lecture_CourseOffering_SectionId] FOREIGN KEY ([SectionId]) REFERENCES [CourseOffering] ([SectionId]) ON DELETE SET NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210824083324_DbTest16')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210824083324_DbTest16', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    ALTER TABLE [Enroll] DROP CONSTRAINT [FK_Enroll_User_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    ALTER TABLE [Enroll] DROP CONSTRAINT [PK_Enroll];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    DECLARE @var20 sysname;
    SELECT @var20 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Enroll]') AND [c].[name] = N'UserId');
    IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [Enroll] DROP CONSTRAINT [' + @var20 + '];');
    ALTER TABLE [Enroll] DROP COLUMN [UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    ALTER TABLE [Enroll] ADD [StudentId] nvarchar(450) NOT NULL DEFAULT N'';
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    ALTER TABLE [Enroll] ADD CONSTRAINT [PK_Enroll] PRIMARY KEY ([StudentId], [SectionId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    CREATE TABLE [Assignment] (
        [LectureId] nvarchar(450) NOT NULL,
        [AssignmentFileId] nvarchar(450) NOT NULL,
        [StudentId] nvarchar(450) NOT NULL,
        CONSTRAINT [PK_Assignment] PRIMARY KEY ([StudentId], [LectureId], [AssignmentFileId]),
        CONSTRAINT [FK_Assignment_Lecture_LectureId] FOREIGN KEY ([LectureId]) REFERENCES [Lecture] ([LectureId]) ON DELETE CASCADE,
        CONSTRAINT [FK_Assignment_User_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    CREATE INDEX [IX_Assignment_LectureId] ON [Assignment] ([LectureId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    ALTER TABLE [Enroll] ADD CONSTRAINT [FK_Enroll_User_StudentId] FOREIGN KEY ([StudentId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182018_DbTest17')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210826182018_DbTest17', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210826182652_DbTest18')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210826182652_DbTest18', N'3.1.15');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210828195838_DbTest19')
BEGIN
    ALTER TABLE [User] DROP CONSTRAINT [FK_User_UserInfo_UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210828195838_DbTest19')
BEGIN
    DROP INDEX [IX_User_UserId] ON [User];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210828195838_DbTest19')
BEGIN
    DECLARE @var21 sysname;
    SELECT @var21 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User]') AND [c].[name] = N'UserId');
    IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [User] DROP CONSTRAINT [' + @var21 + '];');
    ALTER TABLE [User] DROP COLUMN [UserId];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210828195838_DbTest19')
BEGIN
    ALTER TABLE [UserInfo] ADD CONSTRAINT [FK_UserInfo_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210828195838_DbTest19')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210828195838_DbTest19', N'3.1.15');
END;

GO

