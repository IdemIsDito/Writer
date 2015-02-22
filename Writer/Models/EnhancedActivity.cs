using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Runtime.Serialization;
using System.Web.Optimization;

namespace Writer.Models
{
	[DataContract]
	public class EnhancedActivity : AppEntity
	{
	
		[DataMember]
		public int ParticipantId { get; set; }
		
		[ForeignKey("ParticipantId")]
		public Participant Participant { get; set; }

		[DataMember] //0 = NULL; 1 = Ja; 2 = Nee, help mij;
		public int HasActivity { get; set; }

		[DataMember]
		public string Title { get; set; }

		[DataMember]
		public string Summary { get; set; }

		[DataMember]
		public string Situation { get; set; }

		[DataMember]
		public string Role { get; set; }

		[DataMember] //0 = NULL; 1 = Ja; 2 = Nee;
		public int Persons { get; set; }

		[DataMember]
		public ICollection<InvolvedPerson> InvolvedPersons { get; set; }

		[DataMember]
		public string Initiation { get; set; }

		[DataMember]
		public string Proceedings { get; set; }

		[DataMember]
		public bool ProceedingsIsChecked { get; set; }

		[DataMember]
		public string Satisfaction { get; set; }

		[DataMember]
		public bool SatisfactionIsChecked { get; set; }

		[DataMember]
		public bool OverviewIsChecked { get; set; }

		[DataMember]
		public DateTime? StartTime { get; set; }

		[DataMember]
		public DateTime? EndTime { get; set; }

	}
}