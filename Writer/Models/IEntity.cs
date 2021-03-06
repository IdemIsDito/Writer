﻿using System;

namespace Writer.Models
{
	public interface IEntity
	{
		int Id { get; set; }
		DateTime CreatedDate { get; set; }
		DateTime? UpdatedDate { get; set; }
	}
}