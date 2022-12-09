select firmaAdi from [dbo].[View_PFAYMCRaporMain] 
 WHERE id=@id GROUP BY firmaAdi ORDER BY firmaAdi