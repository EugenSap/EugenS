using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xtensive.Orm;

namespace EugenS.Models
{
    [HierarchyRoot]
    public class Company : Entity
    {
        /// <summary>
        /// Id
        /// </summary>
        [Field]
        [Key]
        public Guid Id { get; set; }

        /// <summary>
        /// Название копании
        /// </summary>
        [Field(Length = 200)]
        public string CompanyName { get; set; }
    }
}
