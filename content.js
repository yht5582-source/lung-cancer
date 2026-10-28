export const CHECKED='2026-10-28';
export const sources={
 iaslc:{title:'IASLC Lung Cancer TNM Stages，第9版',version:'TNM9，2025 起使用',url:'https://www.iaslc.org/file/10871/download?token=DmNIDkWP',scope:'T、N、M 定義與期別分組；圖表獨立核對。'},
 stagepaper:{title:'IASLC：TNM9 期別分組原始研究',version:'J Thorac Oncol 2024',url:'https://www.jto.org/article/S1556-0864(24)00079-0/pdf',scope:'T1N1、T1N2a、T3N2a 與 T2N2b 分組變更。'},
 who:{title:'WHO／IARC Thoracic Tumours',version:'第5版，2021；公開分類目錄',url:'https://whobluebooks.iarc.who.int/structures/thoracic-tumours/',scope:'胸腔腫瘤分類架構。完整形態與診斷條件須查原書；本站不重製全文。'},
 nccn:{title:'NCCN NSCLC 公開發表版本',version:'Version 4.2026，JNCCN 24(4):e260017',url:'https://doi.org/10.6004/jnccn.2026.0017',scope:'已確認公開發表版本及生物標記主題；專業版動態全文未能完整存取。本站不宣稱逐條符合最新版 NCCN 或轉載其流程圖。'},
 nccnportal:{title:'NCCN 專業版 NSCLC 指引入口',version:'登入後核對當日版本',url:'https://www.nccn.org/professionals/physician_gls/pdf/nscl.pdf',scope:'供有權限醫師查核；此次無法完整讀取，不能當作已逐條核對。'},
 esmoearly:{title:'ESMO：早期及局部晚期 NSCLC',version:'2025，Ann Oncol 36:1245–1262',url:'https://www.annalsofoncology.org/article/S0923-7534(25)00923-8/fulltext',scope:'診斷、TNM9、可切除與不可切除之治療架構。'},
 esmotarget:{title:'Pan-Asian adapted ESMO：驅動基因陽性轉移性 NSCLC',version:'2024，ESMO Open 103996',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11648200/',scope:'分子檢測、標靶與抗藥性；非窮盡之藥物摘要。'},
 esmoliving:{title:'ESMO Oncogene-Addicted NSCLC Living Guideline',version:'官方目錄列 v1.3，2026-02',url:'https://www.esmo.org/guidelines/guidelines-news',scope:'確認有更新；動態推薦內容未完整存取，不將 2024 摘要標為 2026 全文。'},
 asco:{title:'ASCO：無驅動基因第IV期 NSCLC',version:'Living Guideline 2026.3.1',url:'https://ascopubs.org/doi/10.1200/JCO-26-00842',scope:'廣泛標記檢測與 PD-L1、效能狀態和治療選擇。'},
 esmosclc:{title:'ESMO：SCLC 臨床實務指引',version:'2021，另補 ADRIATIC 更新',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9464246/',scope:'SCLC 病理、分期、有限期與擴散期治療。2021 文件不含後續新證據。'},
 adriatic:{title:'ADRIATIC：有限期 SCLC 放化療後 durvalumab',version:'NEJM，2024',url:'https://www.nejm.org/doi/10.1056/NEJMoa2404873',scope:'同步放化療後無惡化病人之鞏固治療證據。'},
 esmoadriatic:{title:'ESMO：有限期 SCLC 鞏固治療更新',version:'ESMO 2024',url:'https://www.esmo.org/insights-by-esmo/all-news/further-support-for-durvalumab-consolidation-as-a-new-standard-of-care-in-limited-stage-sclc',scope:'ADRIATIC 臨床意義。'},
 nci:{title:'NCI PDQ：NSCLC 治療（醫療專業版）',version:'動態網頁，查閱日見上',url:'https://www.cancer.gov/types/lung/hp/non-small-cell-lung-treatment-pdq',scope:'局部、標靶、免疫治療與實證連結；不是 NCCN 指引。'},
 ncisclc:{title:'NCI PDQ：SCLC 治療（醫療專業版）',version:'動態網頁，查閱日見上',url:'https://www.cancer.gov/types/lung/hp/small-cell-lung-treatment-pdq',scope:'初治與復發 SCLC 選項；不是台灣許可或給付證明。'},
 nhichapter:{title:'健保署：第9節抗癌瘤藥物完整規定',version:'115.09.22 更新（索引頁 115.10.27 更新時仍為此版）；內含 115.10.01 生效條文',url:'https://www.nhi.gov.tw/ch/dl-55685-99c675b771ab4b2789c891bc8db447ce-1.pdf',scope:'2026-10-28 逐條核對肺癌相關條文：EGFR、ALK、ROS1、BRAF、MET、NTRK 標靶、amivantamab、9.69 免疫、pemetrexed、bevacizumab；並核對截至 115.10.28 之法規公告清單，未見其後肺癌藥品修訂。完整申報仍須合併通則（含通則十二）。'},
 nhiportal:{title:'健保署：最新版藥品給付規定分章節',version:'查核 2026-10-28',url:'https://www.nhi.gov.tw/ch/cp-7593-ad2a9-3397-1.html',scope:'核對最新章節、通則與申請表。'},
 nhiegfr:{title:'健保署：EGFR TKI 修訂對照表',version:'115.08.01 生效（新增 aumolertinib 9.138 與互換規定）',url:'https://www.nhi.gov.tw/ch/dl-100554-4be16d1317d547a8a2db6ccec9ab6596-1.pdf',scope:'第一／二線用藥互換限制、T790M 與疾病惡化證明；未變更部分以完整規定為準。'},
 nhiici:{title:'健保署：免疫檢查點抑制劑修訂對照表',version:'115.10.01 生效，PDF 第1–5頁',url:'https://www.nhi.gov.tw/ch/dl-102295-27291c4ec0bf4ea18b2ed65ec171062f-1.pdf',scope:'9.69：NSCLC／SCLC 療法、PD-L1 個別門檻；不能把一個門檻套用全部免疫藥。'},
 ngs:{title:'健保署 NGS 值集／支付規範',version:'FHIR IG v1.0.0，2025-04-30',url:'https://nhicore.nhi.gov.tw/ngs/ValueSet-nhi-ngs-payment.html',scope:'院所、檢體、次數、核備與上傳要求；值集不是最新全部適應症之保證。'},
 ngsqa:{title:'健保署 NGS 支付標準問答輯',version:'內頁 113.08.05 第二版（檔名 1130819）',url:'https://www.nhi.gov.tw/ch/dl-69957-04acdb972dc54e4ebb47fa3fab24b0fd-1.pdf',scope:'NGS 實務釋疑；歷史版本，須與現行支付標準合併核對。'},
 ngsappendix:{title:'健保署：NGS 附表2.2.1 修訂資料',version:'113年第4次會議資料，歷史版本',url:'https://www.nhi.gov.tw/ch/dl-75455-4a021156791047b38cc0a814be5f388c-1.pdf',scope:'肺癌檢測時機及必測位點之歷史核對。會議資料不等於目前全部生效規範。'},
 ngslatest:{title:'健保署：現行醫療服務支付標準',version:'索引：115.09.01 生效／115.09.30 更新',url:'https://www.nhi.gov.tw/ch/lp-3778-1.html',scope:'最新完整壓縮檔此次未能解讀。肺癌 NGS 2026 完整適應症須由院內申報端再核對。'}
};
export const diagnostics=[
 {title:'疑似肺癌：先取得能回答分期與治療問題的檢體',body:'記錄症狀、吸菸史、既往癌症與 ECOG。胸部含上腹顯影 CT 評估原發、縱膈與肝腎上腺；以最安全、可同時證實最高期別的位置取樣，例如可及轉移灶、肋膜液細胞學或 EBUS-TBNA。影像疑似癌症仍需病理／細胞學確認；陰性取樣須評估代表性。',refs:['esmoearly','nci']},
 {title:'完成分期與可切除性評估',body:'考慮根治治療者安排 PET-CT，依期別、神經症狀與治療情境安排腦 MRI；PET-CT 不能取代腦 MRI。會改變治療的疑似轉移或縱膈結節，能取樣時應確認。中央型、淋巴結可疑或高風險病灶評估侵入性縱膈分期；影像陰性不必然排除微小轉移。',refs:['esmoearly','esmosclc']},
 {title:'病理與標記同步規劃',body:'病理科評估腫瘤比例、形態與少量必要 IHC，保存組織供 DNA／RNA 檢測。NSCLC 分類後評估驅動基因與 PD-L1；血液 ctDNA 可補充組織不足，但陰性不能排除驅動基因。SCLC 的例行治療選擇不以 PD-L1 作必要分流條件。',refs:['who','esmotarget','asco','esmosclc']},
 {title:'MDT 與整體照護',body:'胸腔外科、腫瘤內科、放腫科、胸腔科、病理及影像共同決定可切除性；加上肺功能 FEV1／DLCO、心肺儲備、肝腎功能、營養與病人意願。及早納入緩和醫療、戒菸及症狀支持。急性大咳血、氣道阻塞、脊髓壓迫或症狀性腦轉移先緊急處置。',refs:['esmoearly','nci']}
];
export const pathology=[
 ['肺腺癌','腺體分化或黏液；TTF-1／Napsin A 可支持肺腺癌，需結合形態、臨床及其他原發鑑別，不能以單一染色確診。小檢體不能可靠判定整體生長型態或 AIS／MIA。'],
 ['鱗狀細胞癌','角化、細胞間橋；p40 可支持鱗狀分化。避免將 p63 單獨陽性視為確診。小檢體、從不吸菸或混合型疑慮者，仍應評估分子檢測。'],
 ['NSCLC-NOS 與特殊型','用最少必要 IHC 分類並保存檢體；大細胞癌通常需要切除標本充分取樣。SMARCA4 缺失腫瘤、肉瘤樣癌及其他罕見型應由胸腔病理專家覆核。'],
 ['SCLC／神經內分泌腫瘤','SCLC 為高惡性度神經內分泌癌，依細胞形態、核塑形、壞死及分裂像判讀，INSM1、synaptophysin、chromogranin 可輔助；Ki-67 可協助但不能單獨區分所有類型。典型／非典型類癌與 LCNEC 不可直接套用 SCLC 路徑。']
];
export const biomarkers=[
 ['EGFR','Ex19del／L858R 與其他變異分開','晚期常見敏感突變：osimertinib 等 EGFR 導向治療；可討論組合策略。Exon20 insertion 另走 amivantamab＋含鉑／pemetrexed 等專屬路徑，不能當一般敏感突變。'],
 ['ALK','融合','alectinib、brigatinib、lorlatinib 等；依中樞活性、毒性與可近性選擇。'],
 ['ROS1','融合','repotrectinib、entrectinib、crizotinib 等；注意中樞病灶與既往 ROS1 TKI。'],
 ['BRAF','V600E','BRAF／MEK 合併抑制（如 dabrafenib＋trametinib）；非 V600E 不能直接類推。'],
 ['MET','exon14 skipping','capmatinib／tepotinib 等；擴增、蛋白表現與 exon14 跳躍是不同生物標記。'],
 ['RET／NTRK','基因融合','RET：selpercatinib 等；NTRK：larotrectinib／entrectinib 等。IHC 篩選陽性需依方法確認。'],
 ['KRAS／ERBB2(HER2)','G12C／活化突變','KRAS G12C 抑制劑與 HER2 導向 ADC 等常涉及既往治療條件。HER2 突變、擴增、IHC 高表現不可互換；藥物與線別須查當期指引。'],
 ['PD-L1','IHC：報告抗體與 TPS／TC／IC','NSCLC 無可用驅動標記後，結合 PD-L1、腫瘤負荷與 PS 評估免疫單藥或合併化療。TPS、TC、IC 不能任意換算；PD-L1 高不推翻優先標靶原則。']
];
export const nhiRows=[
 {title:'EGFR TKI 第一線：9.24／9.29／9.45／9.80／9.83／9.138',status:'已逐條核對',date:'第9節 115.09.22（含 115.08.01 修訂）',refs:['nhichapter','nhiegfr'],body:'限單用於第ⅢB、ⅢC或Ⅳ期肺腺癌第一線：gefitinib、erlotinib、afatinib 為 EGFR-TK 突變；osimertinib、aumolertinib 限 Ex19del／L858R；dacomitinib 限 Ex19del／L858R 且無腦轉移。另 erlotinib＋bevacizumab 限第Ⅳ期、L858R 且有腦轉移之非鱗狀 NSCLC（9.37；每次12週）。以上第一線用藥（含 erlotinib＋bevacizumab 組合）僅得擇一，除耐受不良不得互換，換藥須符合新藥條件。Osimertinib／aumolertinib 須事前審查，每3個月以影像證實無惡化再申請；其餘口服 TKI 為病歷留存、每次處方4週、8–12週完整評估。均須檢附 EGFR 報告並符合通則十二。',gap:'條文只寫第ⅢB–Ⅳ期第一線、單用。術後輔助、根治放化療後鞏固、osimertinib＋化療、amivantamab＋lazertinib 均未列於第9節。條文期別未註明 TNM 版本，TNM9 轉換後須由申報端確認。'},
 {title:'EGFR T790M 第二線與其他後線',status:'已逐條核對',date:'9.80／9.138；115.08.01',refs:['nhichapter','nhiegfr'],body:'Osimertinib 或 aumolertinib（擇一）：先前 gefitinib、erlotinib、afatinib 或 dacomitinib 失敗且具 T790M 之局部侵犯性或轉移性 NSCLC，須既往用藥證明及惡化影像（可測量病灶優先）。Gefitinib／erlotinib 另有含鉑化療（或 ≥70 歲第一線化療）後之後線；erlotinib 另有含鉑4週期後穩定（SD）之維持療法；afatinib 另有含鉑後鱗狀 NSCLC 第二線。',gap:'第一線已用 osimertinib 或 aumolertinib 者，條文未提供後續 EGFR TKI 路徑；抗藥後治療須依各藥條文另查，並注意 9.69 要求 EGFR 原生型。'},
 {title:'EGFR exon20 insertion：amivantamab 9.126',status:'已逐條核對',date:'114.10.01',refs:['nhichapter'],body:'Amivantamab 併用 carboplatin 及 pemetrexed，用於 exon 20 插入突變之局部晚期或轉移性 NSCLC 成人第一線（pemetrexed 9.26 同步列載）。須事前審查，檢附病理與 exon20 報告（通則十二），每3個月以療效評估再申請，惡化即不得再申請。',gap:'後線單用 amivantamab、amivantamab 用於 Ex19del／L858R 均未列於第9節。'},
 {title:'ALK：9.50／9.59／9.60／9.81／9.82',status:'已逐條核對',date:'最近修訂 113.06.01',refs:['nhichapter'],body:'第一線：alectinib、brigatinib、lorlatinib、ceritinib 用於 ALK 陽性晚期 NSCLC；crizotinib 第一線僅限 113.09.01 前已核准者續用。五者第一線擇一，除嚴重不良反應或耐受不良不得互換。後線：lorlatinib 用於 ceritinib、alectinib 或 brigatinib 治療中惡化；brigatinib 用於 crizotinib 治療中惡化。均須事前審查、每3個月再申請；每日上限 alectinib 1200 mg、brigatinib 180 mg、ceritinib 450 mg。',gap:'Alectinib 術後輔助未列於第9節。第一線 lorlatinib 後惡化，條文未列其他 ALK TKI。'},
 {title:'ROS1：9.50／9.93／9.131',status:'已逐條核對',date:'最近修訂 115.02.01',refs:['nhichapter'],body:'Crizotinib（每日上限 500 mg）或 entrectinib（600 mg）用於 ROS1 陽性晚期 NSCLC，二者擇一，除嚴重不良反應或耐受不良不得互換。Repotrectinib 限 crizotinib 或 entrectinib 治療中惡化之 ROS1 陽性局部晚期或轉移性 NSCLC 成人（每日上限 320 mg）。均須事前審查並檢附 ROS1 報告。',gap:'Repotrectinib 第一線未列；entrectinib 之 NTRK 適應症未列於 9.93。'},
 {title:'BRAF、MET、NTRK：9.91／9.101／9.95',status:'已逐條核對',date:'最近修訂 113.06.01',refs:['nhichapter'],body:'Dabrafenib＋trametinib：BRAF V600E 第Ⅳ期 NSCLC，限含鉑第一線化療後惡化之第二線；本品無效後不再給付該適應症之 PD-1／PD-L1 抑制劑。Tepotinib：MET exon14 skipping 轉移性 NSCLC（每日最多2粒），無效後同樣不再給付該適應症之免疫檢查點抑制劑。Larotrectinib：NTRK 融合且無已知後天抗性突變、無合適替代治療（含免疫）；肺癌限不適合化療之晚期、鱗狀含鉑後、腺癌兩線化療後，或 EGFR TKI 後因 NTRK 融合抗藥。',gap:'BRAF 第一線、capmatinib 均未列於第9節。先用標靶再用免疫的順序會影響後續免疫給付，送審前須規劃線別。'},
 {title:'RET、KRAS G12C、HER2：第9節未見肺癌給付條文',status:'第9節（115.09.22）未見條文',date:'查核 2026-10-28',refs:['nhichapter','nhiportal'],body:'第9節全文檢索未見 selpercatinib、pralsetinib、sotorasib、adagrasib 之給付規定；trastuzumab deruxtecan（9.115）僅列乳癌適應症，未含 HER2 突變 NSCLC。',gap:'「未見給付規定」不等於已確認品項收載狀態；是否收載或有暫予支付公告，請藥劑部查藥品支付標準與最新公告。國外核准或指引建議不能推定台灣給付。'},
 {title:'免疫檢查點抑制劑 9.69：NSCLC 給付範圍與 PD-L1',status:'已逐條核對',date:'115.10.01 生效（tislelizumab 公告 115.09.15）',refs:['nhichapter','nhiici'],body:'單用：durvalumab 用於不可切除第三期、同步放療合併至少2週期含鉑後無惡化之鞏固，PD-L1 ≥1%（SP263），自首次處方起1年；轉移性第一線單用 pembrolizumab／cemiplimab TPS ≥50%、atezolizumab TC ≥50% 或 IC ≥10%；鱗狀第二線與腺癌第三線 pembrolizumab TPS ≥50%、nivolumab／tislelizumab TC ≥50%、atezolizumab TC ≥50% 或 IC ≥10%。併用：術前 nivolumab＋含鉑（非鱗狀加 pemetrexed），限可切除、腫瘤 ≥4 cm 或 N1／N2（排除 N3）、M0、無 EGFR／ALK 異常，至多3療程，不需 PD-L1 報告；鱗狀第一線 pembrolizumab（TPS 1–49%）或 tislelizumab（不需報告）＋carboplatin／paclitaxel 至多4療程後單藥；非鱗狀第一線 pembrolizumab＋pemetrexed＋含鉑（不需報告）、tislelizumab＋pemetrexed＋含鉑（TC ≥50%）或 atezolizumab＋bevacizumab＋carboplatin／paclitaxel（不需報告）。',gap:'基因要求：非鱗狀須 EGFR／ALK／ROS1 原生型，鱗狀須 EGFR／ALK 原生型。術後輔助免疫與圍手術期（術前＋術後）方案未列。PD-L1 須以藥品對應之 class III IVD 抗體判讀，SP263 僅部分藥品適用。'},
 {title:'免疫檢查點抑制劑 9.69：共通條件與續用',status:'已逐條核對',date:'115.10.01 版本',refs:['nhichapter','nhiici'],body:'ECOG ≤1；NYHA I–II；GOT、GPT <60 U/L 且總膽紅素 <1.5 mg/dL；肺癌須 creatinine <1.5 mg/dL 且 eGFR >60 mL/min/1.73m²。每人每適應症限一種免疫藥且不得互換，治療期間不得合併申報該適應症標靶藥（ABCP 例外），無效或期滿後不再給付該適應症相關標靶藥。給付期限自首次處方起2年。事前審查每次12週，檢附病理、基因與 PD-L1 報告、12週內影像（不含 PET）、既往完整用藥及治療計畫；每12週以 iRECIST 評估。',gap:'Atezolizumab、durvalumab 評估為 SD 可再用12週，連續兩次 SD 不得續用（durvalumab 鞏固不在此限）；iUPD 可續用4–8週後再評估。eGFR ≤60 的病人即使臨床可用免疫，也不符合本條健保給付。'},
 {title:'SCLC：9.69 擴散期免疫合併化療',status:'已逐條核對',date:'最近修訂 114.02.01',refs:['nhichapter','nhiici'],body:'Atezolizumab＋carboplatin＋etoposide，或 durvalumab＋etoposide＋carboplatin／cisplatin；限先前未曾接受化療、無腦部或無脊髓轉移之擴散期成人（事審代碼 P021，不需 PD-L1 報告），並須符合上列共通條件。',gap:'有限期 SCLC 放化療後 durvalumab 鞏固（ADRIATIC）未列於 9.69；SCLC 後線之 tarlatamab、lurbinectedin 未見第9節條文。腦或脊髓轉移者不符本條。'},
 {title:'化療與抗血管新生：9.26 pemetrexed、9.37 bevacizumab',status:'已逐條核對',date:'9.26：115.10.01',refs:['nhichapter'],body:'Pemetrexed（顯著鱗狀除外）：含鉑併用第一線限 ECOG 0–1；含鉑或 ≥70 歲第一線化療失敗後單藥；與 pembrolizumab 或 tislelizumab 及含鉑、與 amivantamab＋carboplatin、與 nivolumab 術前併用時限指定品項並須符合對應條文；每4療程評估。Bevacizumab 肺癌限 erlotinib 併用（L858R 腦轉移）及 ABCP 指定品項。',gap:'不同 pemetrexed／bevacizumab 品項適用範圍不同，送審須核對商品名。'},
 {title:'NGS：30302B／30303B',status:'已核對歷史支付規範；2026 適應症待核對',date:'2025-04-30 值集＋113年附表；現行完整檔待讀',refs:['ngs','ngsqa','ngsappendix','ngslatest'],body:'小套組 ≤100 基因 20,000 點、大套組 >100 基因 30,000 點（歷史支付標準）。須符合院所資格、MTB、核定實驗室與病理組織要求；同癌別擇一、終生一次，申報後一個月內上傳結果。點數不是固定自付額。',gap:'NGS 屬醫療服務支付標準，不在藥品第9節，本次未重新核對。2026 完整適應症、先行檢測、差額及申報碼均須查現行標準，不自動判定可給付。'}
];
export const cases=[
 {id:1,title:'早期肺腺癌：手術與病理分期',tag:'可切除 NSCLC',patient:'62歲女性，不吸菸，ECOG 0。右上肺周邊實性結節2.4 cm，無臟層肋膜或鄰近結構侵犯；肺功能可承受切除。',workup:'CT、PET-CT 未見結節或遠端轉移；無神經症狀，腦部影像依根治療程規劃。穿刺為 TTF-1／Napsin A 支持之腺癌。MDT 評估適合手術；術中系統性淋巴結評估。',tnm:['T1c','N0','M0'],stage:'IA3',reason:'最大徑 >2 至 ≤3 cm 且無較高 T 描述因子，因此 cT1cN0M0。術後若發現侵犯或結節陽性，需重新記錄 pTNM。',treatment:'根治性切除並評估淋巴結；手術範圍依腫瘤位置、實性比例、肺功能與外科評估。R0、pIA3 不常規使用輔助化療；不因任一 EGFR 陽性就直接開術後標靶。',alternatives:'若因心肺疾病無法手術，討論 SBRT；不是所有早期病人都需要全身免疫治療。',nhi:'不由 IA3 推定術後標靶或 NGS 給付。NGS 歷史肺癌條件以晚期特定情境為主，需個別查核。',follow:'檢視切緣與 pTNM；建立術後胸部 CT 追蹤計畫，戒菸與功能復健。',refs:['iaslc','esmoearly','nci','ngslatest'],load:{hist:'adeno',setting:'early',marker:'unknown',pdl:'unknown',ps:'good'}},
 {id:2,title:'單站 N2：TNM9 IIB 不代表只需手術',tag:'N2a 分期陷阱',patient:'68歲男性，ECOG 1。左上肺2.6 cm 腺癌，PET 顯示4L站攝取增加，無其他結節或遠端轉移。',workup:'EBUS 證實4L單站轉移，其他相關站取樣陰性，腦 MRI 陰性。EGFR／ALK 未見異常，PD-L1 TPS 20%。肺功能與心臟評估可接受治療。',tnm:['T1c','N2a','M0'],stage:'IIB',reason:'N2a 是單一同側縱膈／隆突下站，而非一顆淋巴結。T1N2a 在 TNM9 為 IIB；過去試驗多用 TNM7／8，不能只用新期別字母移植療法。',treatment:'胸腔 MDT 討論 N2 體積、是否 bulky、可 R0 切除及手術風險，選擇多模式策略；適當可切除且無 EGFR／ALK 異常者可討論術前含鉑＋免疫，術後依病理與方案續行。',alternatives:'若不可切除或風險不宜，改根治性放化療路徑；療程選擇須以解剖分期與試驗納入條件匹配。',nhi:'9.69 術前輔助限 nivolumab＋含鉑＋pemetrexed（非鱗狀），條件為可切除、腫瘤 ≥4 cm 或 N1／N2（排除 N3）、M0、無 EGFR／ALK 異常，至多3療程，不需 PD-L1 報告。本例 N2a、EGFR／ALK 陰性、ECOG 1 與條文相符，仍須確認肝腎心功能（如 eGFR >60）並事前審查。條文未列術後免疫延續。',follow:'重新影像分期與評估可切除性；記錄 yc／ypTNM，監測肺炎及手術時機。',refs:['iaslc','stagepaper','esmoearly','nhichapter'],load:{hist:'adeno',setting:'resect',marker:'none',pdl:'mid',ps:'good'}},
 {id:3,title:'不可切除局部晚期：放化療後鞏固',tag:'NSCLC 第III期',patient:'65歲男性，ECOG 1。右肺4.5 cm 鱗癌，同側縱膈4R、7站均陽性，無遠端轉移。',workup:'EBUS 確認多站 N2，PET-CT 與腦 MRI 完成；EGFR／ALK 原生型、PD-L1 10%。MDT 因多站及局部病灶評估不可切除。',tnm:['T2b','N2b','M0'],stage:'IIIB',reason:'T2b 是 >4 至 ≤5 cm；多站同側縱膈為 N2b。T2N2bM0 在 TNM9 為 IIIB。',treatment:'體能與器官功能允許時採根治性同步含鉑放化療；療程後無惡化且毒性恢復，評估 durvalumab 鞏固。',alternatives:'無法同步治療者評估序列治療或其他個別化方案，不能把不同放化療情境的健保條件混為一談。EGFR 19del／L858R 腺癌則需另外討論 osimertinib 鞏固證據。',nhi:'9.69 durvalumab 鞏固：第三期不可切除、PD-L1 ≥1%（SP263）、鱗狀須 EGFR／ALK 原生型、同步放療合併至少2週期含鉑後無惡化，自首次處方起1年。本例條件相符，仍須 ECOG ≤1、eGFR >60 等共通條件與事前審查。',follow:'治療前後肺症狀、CT、血氧與甲狀腺／肝腎功能；新發喘先鑑別感染、放射肺炎、免疫肺炎及惡化。',refs:['iaslc','esmoearly','nci','nhiici'],load:{hist:'squamous',setting:'unresect',marker:'none',pdl:'mid',ps:'good'}},
 {id:4,title:'EGFR 陽性轉移：PD-L1 高仍先看驅動標記',tag:'分子導向 NSCLC',patient:'58歲女性，ECOG 1。3.6 cm 肺腺癌，無區域結節；肝臟單一1.5 cm 轉移已取樣證實。PD-L1 TPS 80%。',workup:'腦 MRI 陰性；肝切片與原發一致，分子檢測 EGFR Ex19del。檢視心電圖、交互作用與肺部基線狀況，記錄 measurable disease。',tnm:['T2a','N0','M1b'],stage:'IVA',reason:'單一胸外轉移為 M1b，任何 T／N 都是 IVA；PD-L1 不影響解剖期別。',treatment:'以 EGFR 導向療法為核心，例如 osimertinib；是否合併化療等策略依疾病負荷、毒性與最新指引共同決策。高 PD-L1 不是優先免疫單藥理由。',alternatives:'寡轉移局部治療可在全身性療法與反應評估後由 MDT 討論；不是以局部治療取代標靶。若之後局部或全身惡化，重新取樣評估抗藥性與轉化。',nhi:'9.80 osimertinib（或 9.138 aumolertinib）第一線限單用於 Ex19del／L858R 第ⅢB–Ⅳ期肺腺癌，本例相符；須事前審查，每3個月以影像證實無惡化再申請。第一線 EGFR TKI 擇一，除耐受不良不得互換；osimertinib＋化療未列於條文。',follow:'定期影像與症狀評估，監測 QT、心功能及間質性肺病風險；進展時分辨寡進展與廣泛抗藥。',refs:['iaslc','esmotarget','nci','nhichapter','nhiegfr'],load:{hist:'adeno',setting:'metastatic',marker:'egfr',pdl:'high',ps:'good'}},
 {id:5,title:'擴散期 SCLC：治療建議與健保限制分開',tag:'SCLC 擴散期',patient:'70歲男性，ECOG 1，吸菸40包年。右肺5.5 cm SCLC，N3 鎖骨上結節；肝臟與骨骼多發轉移。',workup:'形態與神經內分泌 IHC 支持 SCLC；腦 MRI 無轉移，電解質、骨髓與肝腎功能評估。沒有常規等待 PD-L1 檢驗的必要。',tnm:['T3','N3','M1c2'],stage:'IVB',reason:'胸外多發病灶跨肝與骨兩個器官系統為 M1c2／IVB，亦屬擴散期；骨骼多處本身仍只算一個器官系統。',treatment:'適合免疫者討論 atezolizumab＋carboplatin／etoposide 或 durvalumab＋含鉑／etoposide，後續免疫維持。及早緩和照護、止痛及營養評估。',alternatives:'有免疫禁忌者考慮含鉑／etoposide；腦 MRI 監測與 PCI 需共同決策，尤其高齡與認知風險。復發再依治療間隔、PS、器官功能選擇後線。',nhi:'9.69 擴散期限先前未化療、無腦部或脊髓轉移；atezolizumab 或 durvalumab 合併化療，不需 PD-L1 報告（P021）。本例腦 MRI 陰性，仍須確認無脊髓轉移、ECOG ≤1、eGFR >60 與肝功能條件後事前審查。',follow:'追蹤腫瘤反應、骨髓抑制、感染、電解質與神經症狀；每次治療前評估器官功能。',refs:['iaslc','esmosclc','ncisclc','nhiici'],load:{hist:'sclc',setting:'extensive',marker:'unknown',pdl:'unknown',ps:'good'}},
 {id:6,title:'有限期 SCLC：同步放化療後的新證據',tag:'SCLC 有限期',patient:'60歲女性，ECOG 0。3.8 cm 右肺 SCLC，4R單站陽性，無遠端或腦轉移；放療科確認可安全納入根治照射範圍。',workup:'病理證實 SCLC；CT、PET-CT、腦 MRI 與肺功能完成。沒有以 PD-L1 決定治療。MDT 評估適合同步治療。',tnm:['T2a','N2a','M0'],stage:'IIIA',reason:'T2aN2aM0 為 IIIA，兼記有限期；有限／擴散期需考慮病灶可否安全涵蓋於照射範圍，不只看 TNM 字母。',treatment:'採同步含鉑／etoposide 與胸部放療；無惡化、毒性恢復者依 ADRIATIC 證據討論 durvalumab 鞏固。此為 2021 ESMO 後的新證據。',alternatives:'無法耐受 cisplatin 時討論 carboplatin；PCI 或腦 MRI 監測須考慮年齡、反應、認知及追蹤可行性。',nhi:'第9節（115.09.22）9.69 小細胞肺癌僅列擴散期初治合併療法，未列有限期放化療後 durvalumab 鞏固；送審前再查最新公告。',follow:'完成治療後安排胸腔與腦部追蹤；監測肺炎、內分泌與骨髓毒性，處理吞嚥與營養問題。',refs:['iaslc','esmosclc','adriatic','esmoadriatic','nhiportal'],load:{hist:'sclc',setting:'limited',marker:'unknown',pdl:'unknown',ps:'good'}}
];
const q=(stem,options,answer,rationale,refs)=>({stem,options,answer,rationale,refs});
export const quizzes={
 resident:[
 q('PD-L1 TPS 80% 的轉移性肺腺癌，驅動基因尚未完成；病況穩定。最佳下一步？',['直接以 PD-L1 判定免疫單藥','先完成適當分子檢測再決定第一線','因為不吸菸而不需檢測','把未知當成陰性'],1,'PD-L1 高不能排除驅動基因。穩定者應取得完整標記；急重症由 MDT 個別評估暫行治療。其餘選項都跳過必要資訊。',['asco','esmotarget']),
 q('TNM9：2.5 cm、無其他侵犯，N0M0 的侵襲性 NSCLC 為何？',['IA1','IA2','IA3','IB'],2,'>2 至 ≤3 cm 為 T1c，N0M0 為 IA3；IA1／IA2 對應更小 T1，IB 對應 T2aN0。',['iaslc']),
 q('何者符合 N2a？',['同側肺門單顆','同側縱膈單一站，可有多顆','雙側縱膈多站','鎖骨上單顆'],1,'N2a 依單站而非單顆。同側肺門屬 N1；對側縱膈或鎖骨上屬 N3。',['iaslc']),
 q('單一肝轉移已證實，未見其他遠端病灶，M分類為何？',['M0','M1a','M1b','M1c2'],2,'單一胸外轉移為 M1b。胸膜／對側肺屬 M1a；多器官多發為 M1c2。',['iaslc']),
 q('血液 ctDNA 未找到驅動基因時，正確解讀？',['完全排除 EGFR／ALK 等','可直接認定無驅動','可能偽陰性，考慮組織檢測','等同 PD-L1 陰性'],2,'腫瘤釋放量低等因素會造成血液偽陰性；血液結果不取代形態病理與必要組織檢測，也不測量 PD-L1 IHC。',['asco','esmotarget']),
 q('SCLC 例行第一線治療是否須先依 PD-L1 門檻篩選？',['所有病人須 TPS ≥50%','僅 TPS 1–49% 可化療','不以 PD-L1 作常規必要分流','以 EGFR 決定 etoposide'],2,'SCLC 的標準分流以有限／擴散期、PS 與適治性為主；不可移植 NSCLC 的 PD-L1 規則。',['esmosclc']),
 q('國際指引推薦藥物，是否代表台灣健保一定給付？',['是，NCCN 自動等同健保','是，只要 FDA 核准','否，須另外核對條文與個案條件','只要病人同意就是健保'],2,'許可、實證推薦與給付是不同層次；須逐一確認藥品、線別、標記、事審及品項。',['nhiportal']),
 q('疑似會改變根治策略的 PET 陽性縱膈結節，合理處理？',['PET 陽性就一定為轉移','可行時以 EBUS 等取得病理確認','不需任何分期','一律先做肺葉切除'],1,'PET 可能因發炎陽性，會改變治療的結節應評估組織確認。其餘選項過度確定或跳過分期。',['esmoearly']),
 q('WHO 肺癌病理分類的正確原則？',['TTF-1 單獨陽性即可不看形態','所有神經內分泌腫瘤均為 SCLC','結合形態、必要 IHC 與臨床資料','小切片可可靠評估整顆腫瘤 AIS'],2,'染色輔助形態與原發鑑別；SCLC、LCNEC、類癌不同，小檢體也不能完整判斷 AIS／MIA。',['who','esmosclc']),
 q('治療中出現新發喘、低血氧，應如何處理？',['等下次門診','自行假定是癌症惡化','即時評估感染、肺炎、栓塞與惡化等，依嚴重度處置','把所有藥物自行加倍'],2,'新發低血氧需及時臨床評估。不能先入為主或用本教學頁代替急症處理。',['nci','ncisclc'])
 ],
 attending:[
 q('TNM9 T1cN2aM0 為 IIB，最恰當的治療思考？',['IIB 一律直接手術即可','仍依 N2 解剖、可切除性與 MDT 規劃多模式治療','自動視為 M1','因降期而不需系統性治療討論'],1,'TNM9 分組改變不會改寫既有試驗納入條件。N2仍需看站數、體積與切除可能，不能只照 IIB 字母選療法。',['stagepaper','esmoearly']),
 q('T2bN2bM0 在 TNM9 為何？',['IIB','IIIA','IIIB','IIIC'],2,'T2N2b 在 TNM9 為 IIIB；T2N2a 為 IIIA，IIIC 常見 T3／T4N3M0。',['iaslc','stagepaper']),
 q('多個骨骼轉移但無其他器官轉移，屬何 M類？',['M1b','M1c1','M1c2','M1a'],1,'骨骼視為一個器官系統，多發骨轉移為 M1c1；跨多器官才為 M1c2，兩者均 IVB。',['iaslc']),
 q('EGFR Ex19del、TPS 90%，晚期腺癌第一線的核心原則？',['高 TPS 必優先免疫單藥','EGFR 導向治療為核心，另評估組合與可近性','所有 EGFR 變異都用同一方案','直接把 Ex19del 視為 exon20 insertion'],1,'敏感 EGFR 突變對治療選擇的意義優先於高 PD-L1。變異別、毒性與治療情境不可混用。',['esmotarget','asco']),
 q('不可切除第III期、EGFR Ex19del，完成放化療無惡化，何者正確？',['一律套用無驅動基因 durvalumab 路徑','另討論 EGFR 導向鞏固證據並獨立查台灣給付','9.80 第一線單藥即自動涵蓋鞏固','PD-L1 高即可略過基因'],1,'國際 EGFR 鞏固證據與晚期第一線用藥、健保給付是不同問題；不能從 9.80 節錄推定已涵蓋。',['nci','esmoearly','nhichapter']),
 q('Osimertinib 第一線後全身惡化，最佳評估？',['自動檢驗 T790M 後沿用舊第二線規則','重新取樣／血液分子分析，必要時組織排除小細胞轉化','只增加劑量','高 TPS 就一律換免疫單藥'],1,'第三代 TKI 抗藥機制多樣，血液不能診斷形態轉化；9.80 T790M 第二線條件針對先前指定 TKI 失敗，不可直接套用。',['esmotarget','nhiegfr']),
 q('有限期 SCLC 完成同步放化療無惡化，durvalumab 的正確說法？',['2021 ESMO 已包含 ADRIATIC 結果','ADRIATIC 支持鞏固，但台灣給付須另查','可直接使用擴散期健保條文申報','只有 TPS ≥50% 才能討論'],1,'ADRIATIC 為2024新證據，不能倒填2021指引；有限期鞏固和擴散期初治給付分開。',['adriatic','esmoadriatic','nhiici']),
 q('NGS 健保值集寫終生一次，臨床抗藥後仍需要重新分子分析，應如何處理？',['不准再作任何檢查','先確認同癌別申報歷史與現行規範，另討論適當檢測及支付方式','第二次一律保證健保','改寫癌別申報'],1,'臨床必要性不等於重複給付；應誠實核對癌別、時機與支付條件，不能從次數限制否定臨床評估。',['ngs','ngslatest','esmotarget']),
 q('HER2 IHC 3+ 與 ERBB2 活化突變如何解讀？',['完全等同','不同標記，藥物、線別與許可需各自核對','IHC 高即可視為任何 exon20 突變','兩者都等同 ALK'],1,'蛋白表現、擴增與突變不是同一概念，不同療法的試驗與許可族群各有定義。',['esmotarget','asco']),
 q('健保附件僅列修訂段落、部分標示「略」時，可做何結論？',['未列出者一律不給付','已有一條符合就保證核准','只能確認已讀段落；合併完整章節、通則及後續公告核對','以醫院自費價格代替支付標準'],2,'修訂表不是完整規範；未核對不等於不給付，核准仍取決於完整條件與送審資料。',['nhiportal','nhiici'])
 ]};

// 固定且均衡的正解位置，便於重測比較，避免答案集中於同一選項。
const answerPositions={resident:[1,2,0,3,1,0,2,3,0,2],attending:[3,0,2,1,0,3,1,2,3,1]};
for(const [level,qs] of Object.entries(quizzes)) qs.forEach((item,i)=>{
 const correct=item.options[item.answer],distractors=item.options.filter((_,j)=>j!==item.answer);
 item.answer=answerPositions[level][i];
 distractors.splice(item.answer,0,correct);item.options=distractors;
});
