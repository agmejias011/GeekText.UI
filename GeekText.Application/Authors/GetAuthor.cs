using GeekText.Database;
using GeekText.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GeekText.Application.Authors
{
    public class GetAuthor
    {
      
            private DbContextApplication context;

            public GetAuthor(DbContextApplication context)
            {
                this.context = context;
            }

            public Author Get(int id)
            {
                return context.Authors.Find(id);
            }

    }
}

