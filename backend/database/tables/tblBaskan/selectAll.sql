SELECT dbo.tblBirimBaskani.id, dbo.tblBirimBaskani.birimId, 
      dbo.tblBirimBaskani.personelId, dbo.tblBirimBaskani.adiSoyadi, 
      dbo.tblPersonel.sicilNo, dbo.tblPersonel.photoURL, 
      dbo.tblPersonel.birim FROM dbo.tblBirimBaskani LEFT OUTER JOIN
 dbo.tblPersonel ON dbo.tblBirimBaskani.personelId = dbo.tblPersonel.id