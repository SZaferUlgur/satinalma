SELECT [id]
      ,[tarih]
      ,[dtsId]
      ,[pfaBaskan]
      ,[pfaUyeBir]
      ,[pfaUyeIki]
      ,[mkBaskan]
      ,[mkUyeBir]
      ,[mkUyeIki]
  FROM [dbo].[tblDTSKomisyon]
  WHERE [dtsId]=@id