# GeekText

## Configuration

1. Navigate to `/GeekText.UI`
2. Copy `appsettings.Development.json.sample` to `appsettings.Development.json` and `appsettings.json`
	- `appsettings.Development.json` and `appsettings.json` are untracked files that won't be committed to the repository; any changes you make are local to your machine.
3. Change the `PgDatabase` connection string in the development file to your local PostgreSQL connection info.
4. Change the `PgDatabase` connection string in the non-development file to the team's Heroku PostgreSQL connection info.