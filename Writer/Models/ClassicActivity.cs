using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public class ClassicActivity : AppEntity
	{
		[DataMember]
		public int ParticipantId { get; set; }
		
		[ForeignKey("ParticipantId")]
		public Participant Participant { get; set; }

		[DataMember]
		public string Title { get; set; }

		[DataMember]
		public string Summary { get; set; }

		[DataMember]
		public string Initiation { get; set; }

		[DataMember]
		public string Proceedings { get; set; }

		[DataMember]
		public string Satisfaction { get; set; }

	}
}