SELECT [id]
      ,[dtsId]
      ,[faturaTarih]
      ,[faturaNo]
      ,[faturaTutar]
      ,[firmaAdi]
      ,[firmaAdres]
      ,[firmaBanka]
      ,[firmaIban]
  FROM [dbo].[tblDTSFatura]
  WHERE [dtsId] = @id