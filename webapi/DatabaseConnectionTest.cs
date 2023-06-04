using System;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using RentHouse.Data;

namespace RentHouse
{
    public class DatabaseConnectionTest
    {
        public static void TestConnection()
        {
            var connectionStringBuilder = new MySqlConnectionStringBuilder
            {
                Server = "localhost",
                Port = 3306,
                Database = "rent_house",
                UserID = "root",
                Password = ""
            };

            var optionsBuilder = new DbContextOptionsBuilder<RentHouseContext>();
            optionsBuilder.UseMySql(connectionStringBuilder.ConnectionString, new MySqlServerVersion(new Version(8, 0, 26)));

            using (var context = new RentHouseContext(optionsBuilder.Options))
            {
                try
                {
                    context.Database.OpenConnection();
                    Console.WriteLine("Connection to the database successful!");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Failed to connect to the database: " + ex.Message);
                }
            }
        }
    }
}
