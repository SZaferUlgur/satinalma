select istekUrun, adet from [dbo].[View_PFAYMCRaporMain] 
    WHERE id=@id GROUP BY istekUrun, adet ORDER BY istekUrun