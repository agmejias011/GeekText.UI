using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Publishers
{
    class GetPublisher
    {
        private DbContextApplication context;

        public GetPublisher(DbContextApplication context)
        {
            this.context = context;
        }

     
    }
}
