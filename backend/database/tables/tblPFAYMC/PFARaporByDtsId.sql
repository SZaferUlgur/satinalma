select firmaAdi, istekUrun, adet, YMaliyet 
    from [dbo].[View_PFAYMCRaporMain] 
    WHERE id=@id 
    GROUP BY firmaAdi, istekUrun, adet, YMaliyet 
    ORDER BY istekUrun