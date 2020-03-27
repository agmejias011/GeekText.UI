using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using GeekText.Database;
using GeekText.Domain.Models;

namespace GeekText.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly DbContextApplication _context;

        public AuthenticationController(DbContextApplication context)
        {
            _context = context;
        }

        // POST: api/Authentication
        [HttpPost]
        public JsonResult Post(LoginInfo data)
        {
            User user      = _context.Users
                .Where(s => s.username == data.username && s.user_password == data.password)
                .FirstOrDefault<User>();
            Result result  = new Result();

            if (user != null)
            {
                result.success = true;
                result.user    = user;
            }

            return new JsonResult(result) { StatusCode = (result.success) ? 200 : 403 };
        }

        public class LoginInfo
        {
            public string username = null;
            public string password = null;
        }

        private class Result
        {
            public bool success = false;
            public User user    = null;
        }
    }
}
