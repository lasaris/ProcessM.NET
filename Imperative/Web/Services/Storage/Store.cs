using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TG.Blazor.IndexedDB;

namespace BakaMining.Services.Storage
{
    public abstract class Store<TStoredType> where TStoredType : class
    {
        private readonly IndexedDBManager _dbManager;
        private readonly string _storename;

        protected Store(IndexedDBManager dbManager, string storename)
        {
            _storename = storename;
            _dbManager = dbManager;
            // _dbManager.ActionCompleted += OnIndexedDbNotification;
        }

        public Task Add(TStoredType file)
        {
            var newRecord = new StoreRecord<TStoredType>
            {
                Storename = _storename,
                Data = file
            };

            return _dbManager.AddRecord(newRecord);
        }
        
        public Task Remove(string filename)
        {
            return _dbManager.DeleteRecord(_storename, filename);
        }

        public async Task<List<TStoredType>> GetAll()
        {
            return await _dbManager.GetRecords<TStoredType>(_storename);
        }

        public Task<TStoredType> Get(string filename)
        {
            return _dbManager.GetRecordById<string, TStoredType>(_storename, filename);
        }
        
        /*
        private void OnIndexedDbNotification(object sender, IndexedDBNotificationArgs args)
        {
            Console.WriteLine(args.Message);
        }
        */
    }
}