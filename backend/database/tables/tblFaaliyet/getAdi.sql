select * from [dbo].[tblFaaliyet] WHERE 
	donem=YEAR(GETDATE()) AND faaliyet=@faaliyetAdi