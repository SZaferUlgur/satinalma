SELECT [id]
      ,[dtsId]
      ,[isinAdi]
      ,[istekliAdi]
      ,[teslimTarihi]
      ,[faturaTarihi]
      ,[faturaNo]
      ,[olurTarihi]
      ,[olurSayisi]
      ,[kesinKarar]
      ,[mkBaskan]
      ,[mkUyeBir]
      ,[mkUyeIki]
      ,[genelSekreter]
      ,[gsUnvan]
  FROM [dbo].[tblKabul]
  WHERE [dtsId] = @id