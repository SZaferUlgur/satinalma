SELECT [id]
      ,[turu]
      ,[dtsId]
      ,[firmaId]
      ,[adiSoyadi]
      ,[firmaAdi]
      ,[adres]
      ,[istekUrun]
      ,[adet]
      ,[yaklasikMaliyet]
      ,[maliyetOrtalama]
      ,[fiyatTeklifi]
      ,[teklifOrtalama]
      ,[tarih]
      ,[insertUser]
  FROM [dbo].[tblPFAYMC]
  WHERE [dtsId]=@id AND [turu]='sozlu' 
  ORDER BY [fiyatTeklifi], [yaklasikMaliyet] ASC