using System;
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
		public string Title { get; set; }

		[DataMember]
		public string Situation { get; set; }

		[DataMember]
		public int Persons  { get; set; } //0 = NULL; 1 = Ja; 2 = Nee

		[DataMember]
		public string InvolvedPersons { get; set; }

		[DataMember]
		public string Initiation { get; set; }

		[DataMember]
		public string Proceedings { get; set; }
		
		[DataMember]
		public string Satisfaction { get; set; }

		[DataMember]
		public DateTime? StartTime { get; set; }

		[DataMember]
		public DateTime? EndTime { get; set; }

	}
}