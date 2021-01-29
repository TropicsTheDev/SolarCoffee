using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SolarCoffee.Data;
using SolarCoffee.Data.Models;

namespace SolarCoffee.Services.Inventory
{
    public class InventoryService : IInventoryService
    {

        private readonly SolarDbContext _db;
        private readonly ILogger<InventoryService> _logger;

        public InventoryService(SolarDbContext dbContext, ILogger<InventoryService> logger)
        {
            _db = dbContext;
            _logger  = logger;
        }

        public void CreateSnapshot()
        {
            throw new System.NotImplementedException();
        }

        public ProductInventory GetByProductId(int productId)
        {
            throw new System.NotImplementedException();
        }

        // Returns all inventory from the db.
        public List<ProductInventory> GetCurrentInventory()
        {
            return _db.ProductInventories.Include(pi => pi.Product).Where(pi => !pi.Product.IsArchived).ToList();
        }

        public List<ProductInventorySnapshot> GetSnapshotHistory()
        {
            throw new System.NotImplementedException();
        }

        // Updates number of available units
        // Updates quantity on hand
        public ServiceResponse<ProductInventory> UpdateUnitsAvailable(int id, int adjustment)
        {
            var now = DateTime.UtcNow;
            try
            {
                var inventory = _db.ProductInventories.Include(inv => inv.Product).First(inv => inv.Product.Id == id);

                inventory.QuantityOnHand += adjustment;

                try
                {
                    CreateSnapshot();
                }
                catch (Exception e)
                {
                     _logger.LogError("Error creating snapshot");
                     _logger.LogError(e.StackTrace);
                }

                _db.SaveChanges();

                return new ServiceResponse<ProductInventory> {
                    IsSuccess = true,
                    Data = inventory,
                    Message = $"Product {id} iventory adjusted",
                    Time = now
                };
            }
            catch (Exception e)
            {
                 return new ServiceResponse<ProductInventory> {
                     IsSuccess = true,
                     Data = null,
                     Message = "Error Updating Quantity On Hand",
                     Time = now
                 };
            }
        }
    }
}