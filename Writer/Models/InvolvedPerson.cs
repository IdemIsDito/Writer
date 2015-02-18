using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Runtime.Serialization;

namespace Writer.Models
{
	public class InvolvedPerson : AppEntity
	{
		[DataMember]
		public int EnhancedActivityId { get; set; }

		[ForeignKey("EnhancedActivityId")]
		public EnhancedActivity EnhancedActivity { get; set; }

		[DataMember]
		public string Name { get; set; }

		[DataMember]
		public string Role { get; set; }
	}
}