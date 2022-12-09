select TOP (1) firmaAdi,adres, sum(isnull(YMaliyet,'0')) as YaklasikMaliyet 
    from [dbo].[View_PFAYMCRaporMain] 
    WHERE id=@id 
    GROUP BY firmaAdi,adres 
    ORDER BY YaklasikMaliyet ASC