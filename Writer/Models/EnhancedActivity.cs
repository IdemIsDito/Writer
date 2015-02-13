using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public class EnhancedActivity : AppEntity
	{
		[DataMember]
		public int ParticipantId { get; set; }
		
		[ForeignKey("ParticipantId")]
		public Participant Participant { get; set; }

		[DataMember]
		public string First { get; set; }

		[DataMember]
		public string Second { get; set; }
	}
}