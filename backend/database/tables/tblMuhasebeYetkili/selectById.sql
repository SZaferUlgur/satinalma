SELECT [id]
      ,[personelId]
      ,[sicilNo]
      ,[adiSoyadi]
      ,[ebysSayi]
      ,[picturePath]
      ,[aktif_flag]
  FROM [dbo].[tblMuhasebeYetkili]
  WHERE [id] = @id AND [aktif_flag]='A'