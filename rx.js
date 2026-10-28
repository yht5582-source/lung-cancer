// 治療指引引擎：病人評估 → 治療目的 → 依序排列之處方（標準劑量、本例估算、健保條文狀態）
// 劑量為仿單／樞紐試驗之標準成人劑量；實際處方須依仿單、器官功能、毒性與藥師覆核。
import {decide} from './logic.js';

// ── 劑量計算 ──
export function bsa(h,w){return h>0&&w>0?Math.sqrt(h*w/3600):null;}
export function calvert(auc,crcl){return crcl>0?Math.round(auc*(Math.min(crcl,125)+25)):null;}
const r10=x=>Math.round(x/10)*10;
export function doseText(d,pt){
 const b=bsa(pt.height,pt.weight);
 if(d.mg!=null)return {std:`${d.mg} mg`,calc:''};
 if(d.mgm2!=null)return {std:`${d.mgm2} mg/m²`,calc:b?`${r10(d.mgm2*b)} mg（BSA ${b.toFixed(2)} m²）`:''};
 if(d.auc!=null){const c=calvert(d.auc,pt.crcl);return {std:`AUC ${d.auc}`,calc:c?`${c} mg（Calvert，CrCl 上限 125）`:''};}
 if(d.mgkg!=null)return {std:`${d.mgkg} mg/kg`,calc:pt.weight?`${Math.round(d.mgkg*pt.weight)} mg`:''};
 if(d.wt){const [cut,lo,hi]=d.wt;return {std:`<${cut} kg：${lo}；≥${cut} kg：${hi}`,calc:pt.weight?(pt.weight<cut?lo:hi):''};}
 return {std:d.txt,calc:''};
}

// ── 處方資料 ──
const Dg=(n,d,r,when)=>({n,d,r,when});
const PLAT=(cis,auc,when='D1')=>({plat:{cis,auc},when});
const PEM=Dg('Pemetrexed',{mgm2:500},'IV','D1'),PEMPRE='Pemetrexed 前置：葉酸 350–1000 µg 每日、B12 1000 µg IM 每9週（首劑前≥7天開始）、dexamethasone 4 mg BID 前中後各1天。';
const NHI=(k,t)=>({k,t});
const ioNhi=(s,pt,extra)=>{const why=[];if(s.ps!=='good')why.push('ECOG 須 ≤1');if(pt.crcl&&pt.crcl<=60)why.push('肺癌須 eGFR >60、Cr <1.5');if(pt.liver)why.push('GOT／GPT 須 <60、膽紅素 <1.5');return why.length?NHI('fail',`9.69 共通條件不符：${why.join('；')}`):extra;};
const carboNhi=pt=>pt.crcl&&pt.crcl<60?'carboplatin 符合 9.2 CCr<60':'carboplatin 依 9.2 限 CCr<60 或指定併用組合，腎功能正常者 cisplatin 才屬一般給付';

export const REG={
 // EGFR
 osi:{name:'Osimertinib 單用',drugs:[Dg('Osimertinib',{mg:80},'PO','每日一次')],cycle:'持續至惡化或無法耐受',trial:'FLAURA',cns:true,nhi:(s)=>s.phase==='progressed'?(s.t790m&&s.priorEgfr==='g12'?NHI('yes','9.80 第二線：前用第一／二代 TKI 失敗且 T790M＋；事前審查每3個月'):NHI('fail','9.80 第二線限前用 gefitinib／erlotinib／afatinib／dacomitinib 失敗且 T790M＋')):NHI('yes','9.80 第一線單用：Ex19del／L858R、ⅢB–Ⅳ期肺腺癌；事前審查每3個月；第一線 EGFR TKI 擇一')},
 aumo:{name:'Aumolertinib 單用',drugs:[Dg('Aumolertinib',{mg:110},'PO','每日一次')],cycle:'持續至惡化或無法耐受',trial:'AENEAS',nhi:(s)=>s.phase==='progressed'?(s.t790m&&s.priorEgfr==='g12'?NHI('yes','9.138 第二線：T790M＋；與 osimertinib 擇一'):NHI('fail','9.138 第二線限 T790M＋且前用第一／二代 TKI')):NHI('yes','9.138 第一線單用：Ex19del／L858R、ⅢB–Ⅳ期肺腺癌；事前審查每3個月；每日限2粒')},
 osichemo:{name:'Osimertinib＋含鉑／pemetrexed',drugs:[Dg('Osimertinib',{mg:80},'PO','每日一次'),PLAT(75,5),PEM],cycle:'每21天×4，之後 osimertinib＋pemetrexed 維持',trial:'FLAURA2',cns:true,pre:[PEMPRE],nhi:()=>NHI('no','9.80 限單獨使用；合併化療之 osimertinib 自費')},
 amilaz:{name:'Amivantamab＋lazertinib',drugs:[Dg('Amivantamab',{wt:[80,'1050 mg','1400 mg']},'IV','每週×4（首劑分 D1／D2），第5週起每2週'),Dg('Lazertinib',{mg:240},'PO','每日一次')],cycle:'持續至惡化',trial:'MARIPOSA',pre:['前4個月預防性 apixaban 2.5 mg BID 或其他抗凝（降低 VTE）；皮膚與甲溝炎預防照護；首劑輸注反應預處置。'],nhi:()=>NHI('no','第9節未列 amivantamab 用於 Ex19del／L858R；lazertinib 未列')},
 erlbev:{name:'Erlotinib＋bevacizumab',drugs:[Dg('Erlotinib',{mg:150},'PO','每日一次'),Dg('Bevacizumab',{mgkg:15},'IV','D1')],cycle:'bevacizumab 每21天；持續至惡化',trial:'JO25567／NEJ026',nhi:(s,pt)=>s.egfrType==='l858r'&&pt.brain!=='none'&&s.hist!=='squamous'?NHI('yes','9.29／9.37：第Ⅳ期、L858R、腦轉移之非鱗狀第一線；每次12週事審'):NHI('fail','9.29／9.37 限 L858R 且有腦轉移之非鱗狀第Ⅳ期第一線')},
 egfr12:{name:'第一／二代 EGFR TKI（擇一）',any:true,drugs:[Dg('Gefitinib',{mg:250},'PO','每日一次'),Dg('Erlotinib',{mg:150},'PO','每日一次（空腹）'),Dg('Afatinib',{mg:40},'PO','每日一次（空腹）'),Dg('Dacomitinib',{mg:45},'PO','每日一次')],cycle:'持續至惡化',trial:'IPASS／LUX-Lung 7／ARCHER 1050',nhi:(s,pt)=>NHI('yes',`9.24／9.29／9.45 第一線；dacomitinib（9.83）${pt.brain!=='none'?'不適用：有腦轉移':'限無腦轉移'}；與 osimertinib／aumolertinib 第一線擇一`)},
 amichemo:{name:'Amivantamab＋carboplatin＋pemetrexed',drugs:[Dg('Amivantamab',{wt:[80,'1400 mg 每週×4 → 第7週起 1750 mg','1750 mg 每週×4 → 第7週起 2100 mg']},'IV','前4週每週（首劑分 D1／D2），第7週起每3週'),Dg('Carboplatin',{auc:5},'IV','D1，×4'),PEM],cycle:'每21天，carboplatin×4 後 amivantamab＋pemetrexed 維持',trial:'PAPILLON（exon20）／MARIPOSA-2（osimertinib 後）',pre:[PEMPRE],nhi:(s)=>s.marker==='exon20'&&s.phase!=='progressed'?NHI('yes','9.126／9.2／9.26：exon20 第一線；事前審查每3個月'):NHI('no','9.126 僅 exon20 第一線；osimertinib 後使用自費')},
 amimono:{name:'Amivantamab 單用',drugs:[Dg('Amivantamab',{wt:[80,'1050 mg','1400 mg']},'IV','每週×4，之後每2週')],cycle:'持續至惡化',trial:'CHRYSALIS',nhi:()=>NHI('no','第9節未列後線單用')},
 // ALK
 alec:{name:'Alectinib',drugs:[Dg('Alectinib',{mg:600},'PO','每日兩次，隨餐')],cycle:'持續至惡化',trial:'ALEX／J-ALEX',cns:true,nhi:()=>NHI('yes','9.60 ALK 第一線；事前審查每3個月；與其他 ALK TKI 第一線擇一')},
 lorla:{name:'Lorlatinib',drugs:[Dg('Lorlatinib',{mg:100},'PO','每日一次')],cycle:'持續至惡化',trial:'CROWN',cns:true,pre:['監測血脂與情緒／認知不良反應；強效 CYP3A 誘導劑禁用。'],nhi:(s)=>s.phase==='progressed'?(s.priorAlk==='g2'?NHI('yes','9.81：alectinib／brigatinib／ceritinib 治療中惡化'):NHI('fail','9.81 後線限 alectinib／brigatinib／ceritinib 惡化後')):NHI('yes','9.81 ALK 第一線；事前審查每3個月')},
 brig:{name:'Brigatinib',drugs:[Dg('Brigatinib',{txt:'90 mg ×7天 → 180 mg'},'PO','每日一次')],cycle:'持續至惡化',trial:'ALTA-1L',cns:true,pre:['起始7天以 90 mg 降低早發性肺毒性。'],nhi:(s)=>s.phase==='progressed'?(s.priorAlk==='crizo'?NHI('yes','9.82：crizotinib 治療中惡化'):NHI('fail','9.82 後線限 crizotinib 惡化後')):NHI('yes','9.82 ALK 第一線；每日上限 180 mg')},
 ceri:{name:'Ceritinib',drugs:[Dg('Ceritinib',{mg:450},'PO','每日一次，隨餐')],cycle:'持續至惡化',trial:'ASCEND-4',nhi:()=>NHI('yes','9.59 ALK 第一線；每日上限 450 mg')},
 // ROS1
 entrec:{name:'Entrectinib',drugs:[Dg('Entrectinib',{mg:600},'PO','每日一次')],cycle:'持續至惡化',trial:'STARTRK-2',cns:true,nhi:(s)=>s.marker==='ros1'?NHI('yes','9.93 ROS1；與 crizotinib 擇一；每日上限 600 mg'):NHI('no','9.93 僅 ROS1；NTRK 未列')},
 crizo:{name:'Crizotinib',drugs:[Dg('Crizotinib',{mg:250},'PO','每日兩次')],cycle:'持續至惡化',trial:'PROFILE 1001',nhi:(s)=>s.marker==='ros1'?NHI('yes','9.50 ROS1；與 entrectinib 擇一'):NHI('fail','9.50 ALK 第一線僅 113.09.01 前核准者續用')},
 repo:{name:'Repotrectinib',drugs:[Dg('Repotrectinib',{txt:'160 mg 每日一次 ×14天 → 160 mg 每日兩次'},'PO','')],cycle:'持續至惡化',trial:'TRIDENT-1',cns:true,nhi:(s)=>s.phase==='progressed'?NHI('yes','9.131：crizotinib 或 entrectinib 治療中惡化；每日上限 320 mg'):NHI('no','9.131 第一線未列')},
 // BRAF / MET / RET / NTRK / KRAS / HER2
 dabtram:{name:'Dabrafenib＋trametinib',drugs:[Dg('Dabrafenib',{mg:150},'PO','每日兩次'),Dg('Trametinib',{mg:2},'PO','每日一次')],cycle:'持續至惡化',trial:'BRF113928',nhi:(s)=>s.phase==='progressed'&&s.priorLine!=='tki'?NHI('yes','9.91：第Ⅳ期、含鉑第一線後惡化之第二線；無效後不再給付該適應症免疫藥'):NHI('fail','9.91 限含鉑第一線後之第二線；第一線使用自費')},
 encobini:{name:'Encorafenib＋binimetinib',drugs:[Dg('Encorafenib',{mg:450},'PO','每日一次'),Dg('Binimetinib',{mg:45},'PO','每日兩次')],cycle:'持續至惡化',trial:'PHAROS',nhi:()=>NHI('no','9.134 僅大腸直腸癌')},
 tepo:{name:'Tepotinib',drugs:[Dg('Tepotinib',{mg:450},'PO','每日一次，隨餐')],cycle:'持續至惡化',trial:'VISION',nhi:()=>NHI('yes','9.101 MET exon14 轉移性 NSCLC；無效後不再給付該適應症免疫藥')},
 capma:{name:'Capmatinib',drugs:[Dg('Capmatinib',{mg:400},'PO','每日兩次')],cycle:'持續至惡化',trial:'GEOMETRY mono-1',nhi:()=>NHI('no','第9節未列')},
 selper:{name:'Selpercatinib',drugs:[Dg('Selpercatinib',{wt:[50,'120 mg','160 mg']},'PO','每日兩次')],cycle:'持續至惡化',trial:'LIBRETTO-431',cns:true,pre:['監測血壓、肝功能、QTc。'],nhi:()=>NHI('no','第9節未見給付規定')},
 pralse:{name:'Pralsetinib',drugs:[Dg('Pralsetinib',{mg:400},'PO','每日一次，空腹')],cycle:'持續至惡化',trial:'ARROW',nhi:()=>NHI('no','第9節未見給付規定')},
 laro:{name:'Larotrectinib',drugs:[Dg('Larotrectinib',{mg:100},'PO','每日兩次')],cycle:'持續至惡化',trial:'NAVIGATE 等合併分析',nhi:()=>NHI('cond','9.95：須無合適替代治療（含免疫），並符合肺癌線別條件')},
 soto:{name:'Sotorasib',drugs:[Dg('Sotorasib',{mg:960},'PO','每日一次')],cycle:'持續至惡化',trial:'CodeBreaK 100／200',nhi:()=>NHI('no','第9節未見給付規定')},
 adag:{name:'Adagrasib',drugs:[Dg('Adagrasib',{mg:600},'PO','每日兩次')],cycle:'持續至惡化',trial:'KRYSTAL-1／12',cns:true,nhi:()=>NHI('no','第9節未見給付規定')},
 tdxd:{name:'Trastuzumab deruxtecan',drugs:[Dg('Trastuzumab deruxtecan',{mgkg:5.4},'IV','D1')],cycle:'每21天',trial:'DESTINY-Lung02',pre:['基線胸部 CT；任何級別間質性肺病須停藥評估。'],nhi:()=>NHI('no','9.115 僅乳癌')},
 zong:{name:'Zongertinib',drugs:[Dg('Zongertinib',{wt:[90,'120 mg','180 mg']},'PO','每日一次')],cycle:'持續至惡化',trial:'Beamion LUNG-1',pre:['台灣許可狀態請先確認。'],nhi:()=>NHI('no','第9節未見給付規定')},
 // 免疫／化療（無驅動）
 pembro:{name:'Pembrolizumab 單用',drugs:[Dg('Pembrolizumab',{txt:'200 mg 每3週 或 400 mg 每6週'},'IV','')],cycle:'至多2年（35 次）',trial:'KEYNOTE-024／042',io:true,nhi:(s,pt)=>ioNhi(s,pt,s.phase==='progressed'?(s.hist==='squamous'||s.priorLine==='chemo2'?NHI('cond','9.69 鱗狀第二線／腺癌第三線：TPS ≥50%'):NHI('fail','9.69 後線限鱗狀第二線或腺癌第三線')):s.pdl==='high'?NHI('yes','9.69 第一線單用：TPS ≥50%（22C3／SP263）'):NHI('fail','9.69 第一線單用須 TPS ≥50%'))},
 cemi:{name:'Cemiplimab 單用',drugs:[Dg('Cemiplimab',{mg:350},'IV','D1')],cycle:'每21天，至多2年',trial:'EMPOWER-Lung 1',io:true,nhi:(s,pt)=>ioNhi(s,pt,s.pdl==='high'?NHI('yes','9.69 第一線單用：TPS ≥50%'):NHI('fail','9.69 第一線單用須 TPS ≥50%'))},
 atezo:{name:'Atezolizumab 單用',drugs:[Dg('Atezolizumab',{mg:1200},'IV','D1')],cycle:'每21天，至多2年',trial:'IMpower110／OAK',io:true,nhi:(s,pt)=>ioNhi(s,pt,NHI('cond','9.69：SP142 TC ≥50% 或 IC ≥10%（與 TPS 不同抗體）'))},
 kn189:{name:'Pembrolizumab＋pemetrexed＋含鉑',drugs:[Dg('Pembrolizumab',{mg:200},'IV','D1'),PEM,PLAT(75,5)],cycle:'每21天×4，之後 pembrolizumab＋pemetrexed 維持（pembrolizumab 至多2年）',trial:'KEYNOTE-189',io:true,pre:[PEMPRE],nhi:(s,pt)=>ioNhi(s,pt,NHI('yes','9.69 非鱗狀第一線併用：不需 PD-L1 報告；pemetrexed 限指定品項；carboplatin 於本組合可給付'))},
 tisnsq:{name:'Tislelizumab＋pemetrexed＋含鉑',drugs:[Dg('Tislelizumab',{mg:200},'IV','D1'),PEM,PLAT(75,5)],cycle:'每21天×4，之後 tislelizumab＋pemetrexed 維持',trial:'RATIONALE-304',io:true,pre:[PEMPRE],nhi:(s,pt)=>ioNhi(s,pt,s.pdl==='high'?NHI('cond',`9.69 非鱗狀併用：SP263 TC ≥50%；9.2 未列本組合之 carboplatin（${carboNhi(pt)}）`):NHI('fail','9.69 tislelizumab 非鱗狀併用須 TC ≥50%'))},
 abcp:{name:'Atezolizumab＋bevacizumab＋carboplatin＋paclitaxel（ABCP）',drugs:[Dg('Atezolizumab',{mg:1200},'IV','D1'),Dg('Bevacizumab',{mgkg:15},'IV','D1'),Dg('Carboplatin',{auc:6},'IV','D1'),Dg('Paclitaxel',{mgm2:200},'IV','D1')],cycle:'每21天×4–6，之後 atezolizumab＋bevacizumab 維持',trial:'IMpower150',io:true,pre:['Paclitaxel 前置：dexamethasone、H1／H2 阻斷劑預防過敏。'],nhi:(s,pt)=>ioNhi(s,pt,NHI('yes','9.69 非鱗狀第一線：不需 PD-L1 報告；bevacizumab 限指定品項'))},
 kn407:{name:'Pembrolizumab＋carboplatin＋paclitaxel',drugs:[Dg('Pembrolizumab',{mg:200},'IV','D1'),Dg('Carboplatin',{auc:6},'IV','D1'),Dg('Paclitaxel',{mgm2:200},'IV','D1')],cycle:'每21天×4，之後 pembrolizumab 單用（至多2年）',trial:'KEYNOTE-407',io:true,pre:['Paclitaxel 前置：dexamethasone、H1／H2 阻斷劑。'],nhi:(s,pt)=>ioNhi(s,pt,s.pdl==='mid'?NHI('yes','9.69 鱗狀第一線併用（P014）：pembrolizumab 限 TPS 1–49%'):NHI('fail','9.69 P014：pembrolizumab 併化療限 TPS 1–49%'))},
 tissq:{name:'Tislelizumab＋carboplatin＋paclitaxel',drugs:[Dg('Tislelizumab',{mg:200},'IV','D1'),Dg('Carboplatin',{auc:5},'IV','D1'),Dg('Paclitaxel',{mgm2:175},'IV','D1')],cycle:'每21天×4，之後 tislelizumab 單用',trial:'RATIONALE-307',io:true,pre:['Paclitaxel 前置：dexamethasone、H1／H2 阻斷劑。'],nhi:(s,pt)=>ioNhi(s,pt,NHI('yes','9.69 鱗狀第一線併用：tislelizumab 不需 PD-L1 報告'))},
 platpem:{name:'含鉑＋pemetrexed（化療）',drugs:[PLAT(75,5),PEM],cycle:'每21天×4，無惡化可 pemetrexed 維持',trial:'JMDB／PARAMOUNT',pre:[PEMPRE],nhi:(s,pt)=>NHI(s.ps==='good'?'cond':'fail',`9.26 第一線併含鉑限 ECOG 0–1、非顯著鱗狀；單藥維持未列於第一線條文；${carboNhi(pt)}`)},
 platgem:{name:'Cisplatin＋gemcitabine（化療）',drugs:[PLAT(75,5),Dg('Gemcitabine',{mgm2:1250},'IV','D1、D8')],cycle:'每21天×4–6',trial:'Scagliotti 2008',nhi:(s,pt)=>NHI('cond',`9.4 依許可證給付；${carboNhi(pt)}`)},
 carbopac:{name:'Carboplatin＋paclitaxel（化療）',drugs:[Dg('Carboplatin',{auc:6},'IV','D1'),Dg('Paclitaxel',{mgm2:200},'IV','D1')],cycle:'每21天×4–6',trial:'ECOG 1594',nhi:(s,pt)=>NHI('cond',`paclitaxel 依 9.5.1 給付（TAXOL 第一線需併 cisplatin）；${carboNhi(pt)}`)},
 carbo1:{name:'單藥或減量化療（體能較差）',any:true,drugs:[Dg('Gemcitabine',{mgm2:1000},'IV','D1、D8 每21天'),Dg('Vinorelbine',{mgm2:25},'IV','D1、D8 每21天'),Dg('Pemetrexed（非鱗狀）',{mgm2:500},'IV','D1 每21天')],cycle:'依耐受性',trial:'ELVIS 等',nhi:()=>NHI('cond','依各藥許可與第9節條文；pemetrexed 第一線單藥未列')},
 doce:{name:'Docetaxel',drugs:[Dg('Docetaxel',{mgm2:75},'IV','D1')],cycle:'每21天',trial:'TAX 317',nhi:()=>NHI('yes','9.3 依許可證給付於 NSCLC')},
 docram:{name:'Docetaxel＋ramucirumab',drugs:[Dg('Docetaxel',{mgm2:75},'IV','D1'),Dg('Ramucirumab',{mgkg:10},'IV','D1')],cycle:'每21天',trial:'REVEL',nhi:()=>NHI('no','9.92 ramucirumab 僅肝細胞癌')},
 pem2:{name:'Pemetrexed 單用（非鱗狀後線）',drugs:[PEM],cycle:'每21天',trial:'JMEI',pre:[PEMPRE],nhi:()=>NHI('yes','9.26：含鉑後失敗之非鱗狀單藥')},
 nivo2:{name:'Nivolumab 單用（未曾用免疫）',drugs:[Dg('Nivolumab',{txt:'240 mg 每2週 或 480 mg 每4週'},'IV','')],cycle:'至多2年',trial:'CheckMate 017／057',io:true,nhi:(s,pt)=>ioNhi(s,pt,NHI('cond','9.69 鱗狀第二線（P011）或腺癌第三線（P012）：TC ≥50%（28-8／SP263）'))},
 // 可切除／術後
 neonivo:{name:'術前 nivolumab＋含鉑雙藥',drugs:[Dg('Nivolumab',{mg:360},'IV','D1'),PLAT(75,5),Dg('Pemetrexed（非鱗狀）或 gemcitabine 1000 mg/m² D1、D8（鱗狀）',{mgm2:500},'IV','D1')],cycle:'每21天×3 → 6週內手術',trial:'CheckMate 816',io:true,pre:[PEMPRE],nhi:(s,pt)=>ioNhi(s,pt,['none','kras','her2','braf','met','ret','ntrk','ros1'].includes(s.marker)?NHI('cond','9.69 術前（P016）：腫瘤 ≥4 cm 或 N1／N2（排除 N3）、M0、無 EGFR／ALK，至多3療程，不需 PD-L1'):NHI('fail','9.69 術前須無 EGFR／ALK 異常且已完成檢測'))},
 periop:{name:'圍手術期 pembrolizumab（術前＋術後）',drugs:[Dg('Pembrolizumab',{mg:200},'IV','術前 D1×4、術後每3週×13'),PLAT(75,5),Dg('Pemetrexed（非鱗狀）或 gemcitabine 1000 mg/m² D1、D8（鱗狀）',{mgm2:500},'IV','術前 D1×4')],cycle:'術前4週期 → 手術 → 術後13週期',trial:'KEYNOTE-671',io:true,nhi:()=>NHI('no','9.69 未列圍手術期／術後免疫')},
 adjchemo:{name:'術後輔助 cisplatin 雙藥',drugs:[Dg('Cisplatin',{mgm2:75},'IV','D1'),Dg('Vinorelbine（或非鱗狀 pemetrexed 500 mg/m² D1）',{mgm2:25},'IV','D1、D8')],cycle:'每21天×4',trial:'LACE 合併分析／JIPANG',nhi:()=>NHI('yes','9.9：pⅡ–ⅢA 術後與鉑類併用至多4療程')},
 adjosi:{name:'術後 osimertinib（輔助化療後）',drugs:[Dg('Osimertinib',{mg:80},'PO','每日一次')],cycle:'至多3年',trial:'ADAURA',cns:true,nhi:()=>NHI('no','9.80 僅ⅢB–Ⅳ期第一線；術後輔助自費')},
 adjalec:{name:'術後 alectinib',drugs:[Dg('Alectinib',{mg:600},'PO','每日兩次，隨餐')],cycle:'2年',trial:'ALINA',nhi:()=>NHI('no','9.60 僅晚期第一線；術後輔助自費')},
 adjatezo:{name:'術後 atezolizumab（輔助化療後，PD-L1 ≥1%）',drugs:[Dg('Atezolizumab',{mg:1200},'IV','D1')],cycle:'每21天×16（1年）',trial:'IMpower010',io:true,nhi:()=>NHI('no','9.69 未列術後輔助')},
 // 局部晚期
 crtcp:{name:'同步放化療：每週 carboplatin＋paclitaxel',drugs:[Dg('Carboplatin',{auc:2},'IV','每週'),Dg('Paclitaxel',{mgm2:45},'IV','每週'),{n:'胸部放療',d:{txt:'60 Gy／30 次'},r:'RT',when:'同步'}],cycle:'放療期間每週',trial:'RTOG 0617',nhi:(s,pt)=>NHI('cond',`paclitaxel 依許可；${carboNhi(pt)}`)},
 crtep:{name:'同步放化療：cisplatin＋etoposide',drugs:[Dg('Cisplatin',{mgm2:50},'IV','D1、D8、D29、D36'),Dg('Etoposide',{mgm2:50},'IV','D1–5、D29–33'),{n:'胸部放療',d:{txt:'60 Gy／30 次'},r:'RT',when:'同步'}],cycle:'2 週期',trial:'SWOG 9504',nhi:()=>NHI('yes','一般化療給付')},
 crtpem:{name:'同步放化療：cisplatin＋pemetrexed（非鱗狀）',drugs:[Dg('Cisplatin',{mgm2:75},'IV','D1'),PEM,{n:'胸部放療',d:{txt:'60–66 Gy／30–33 次'},r:'RT',when:'同步'}],cycle:'每21天×3',trial:'PROCLAIM',pre:[PEMPRE],nhi:()=>NHI('cond','9.26 第一線併含鉑限 ECOG 0–1、非鱗狀')},
 durvacons:{name:'Durvalumab 鞏固',drugs:[Dg('Durvalumab',{txt:'10 mg/kg 每2週 或 1500 mg 每4週（≥30 kg）'},'IV','')],cycle:'至多12個月',trial:'PACIFIC',io:true,nhi:(s,pt)=>ioNhi(s,pt,s.pdl==='mid'||s.pdl==='high'?NHI('yes','9.69 鞏固（P015）：PD-L1 ≥1%（SP263）、同步放療＋≥2週期含鉑後無惡化、1年'):s.pdl==='low'?NHI('fail','9.69 鞏固須 PD-L1 ≥1%'):NHI('cond','9.69 鞏固須 SP263 PD-L1 ≥1%'))},
 osicons:{name:'Osimertinib 鞏固',drugs:[Dg('Osimertinib',{mg:80},'PO','每日一次')],cycle:'持續至惡化',trial:'LAURA',cns:true,nhi:()=>NHI('no','9.80 未列放化療後鞏固')},
 // SCLC
 epls:{name:'Cisplatin＋etoposide＋胸部放療',drugs:[PLAT(75,5),Dg('Etoposide',{mgm2:100},'IV','D1–3'),{n:'胸部放療',d:{txt:'45 Gy／30 次 每日兩次（或 60–70 Gy 每日一次）'},r:'RT',when:'第1–2 週期開始同步'}],cycle:'每21天×4',trial:'Turrisi 1999／CONVERT',nhi:(s,pt)=>NHI('cond',`cisplatin／etoposide 一般給付；${carboNhi(pt)}`)},
 adriatic:{name:'Durvalumab 鞏固（有限期）',drugs:[Dg('Durvalumab',{mg:1500},'IV','每4週')],cycle:'至多24個月',trial:'ADRIATIC',io:true,nhi:()=>NHI('no','9.69 SCLC 僅列擴散期')},
 atezoep:{name:'Atezolizumab＋carboplatin＋etoposide',drugs:[Dg('Atezolizumab',{mg:1200},'IV','D1'),Dg('Carboplatin',{auc:5},'IV','D1'),Dg('Etoposide',{mgm2:100},'IV','D1–3')],cycle:'每21天×4，之後 atezolizumab 1200 mg 每3週（或 1680 mg 每4週）',trial:'IMpower133',io:true,nhi:(s,pt)=>ioNhi(s,pt,pt.brain!=='none'?NHI('fail','9.69 SCLC 限無腦部或脊髓轉移'):NHI('yes','9.69 擴散期初治（P021）：不需 PD-L1；須無腦部／脊髓轉移'))},
 durvaep:{name:'Durvalumab＋含鉑＋etoposide',drugs:[Dg('Durvalumab',{mg:1500},'IV','D1'),PLAT(75,5),Dg('Etoposide',{mgm2:100},'IV','D1–3')],cycle:'每21天×4，之後 durvalumab 1500 mg 每4週',trial:'CASPIAN',io:true,nhi:(s,pt)=>ioNhi(s,pt,pt.brain!=='none'?NHI('fail','9.69 SCLC 限無腦部或脊髓轉移'):NHI('yes','9.69 擴散期初治（P021）：cisplatin 或 carboplatin 皆列'))},
 epes:{name:'含鉑＋etoposide（化療）',drugs:[PLAT(75,5),Dg('Etoposide',{mgm2:100},'IV','D1–3')],cycle:'每21天×4–6',trial:'標準化療',nhi:(s,pt)=>NHI('cond',`一般化療給付；${carboNhi(pt)}`)},
 rechal:{name:'含鉑＋etoposide 再挑戰',drugs:[PLAT(75,5),Dg('Etoposide',{mgm2:100},'IV','D1–3')],cycle:'每21天×4–6',trial:'Baize 2020',nhi:(s,pt)=>NHI('cond',`一般化療給付；${carboNhi(pt)}`)},
 tarla:{name:'Tarlatamab',drugs:[Dg('Tarlatamab',{txt:'C1D1 1 mg → C1D8、D15 10 mg → 之後每2週 10 mg'},'IV','')],cycle:'持續至惡化',trial:'DeLLphi-304',pre:['首兩劑後住院或密切監測 CRS 與 ICANS 24–48 小時。'],nhi:()=>NHI('no','第9節未見給付規定')},
 lurbi:{name:'Lurbinectedin',drugs:[Dg('Lurbinectedin',{mgm2:3.2},'IV','D1')],cycle:'每21天',trial:'Trigo 2020',nhi:()=>NHI('no','第9節未見給付規定')},
 topo:{name:'Topotecan',drugs:[Dg('Topotecan',{mgm2:1.5},'IV','D1–5（口服 2.3 mg/m² D1–5）')],cycle:'每21天',trial:'von Pawel 1999',nhi:()=>NHI('yes','9.16：SCLC 第二線（第一線含鉑後）')}
};

// ── 情境 → 處方排序 ──
const T=(tier,id,why)=>({tier,id,why});
function nsclcFirstNoDriver(s,pt){
 const sq=s.hist==='squamous',hi=s.pdl==='high',o=[];
 if(sq){
  if(hi)o.push(T('首選','pembro','PD-L1 TPS ≥50%：免疫單藥，毒性較低。'),T('首選','kn407','高腫瘤負荷或需快速反應時改用免疫合併化療。'),T('替代','cemi','另一個 TPS ≥50% 的單藥選擇。'));
  else o.push(T('首選','tissq','鱗狀第一線免疫合併化療；健保不需 PD-L1 報告。'),T('首選','kn407',s.pdl==='mid'?'TPS 1–49%：pembrolizumab 合併化療，健保 P014 相符。':'與 tislelizumab 組合療效相近；健保 P014 限 TPS 1–49%。'));
  o.push(T('替代','atezo','SP142 TC ≥50% 或 IC ≥10% 者之單藥選擇。'),T('特定情況','platgem','免疫禁忌時：鱗狀雙藥化療。'),T('特定情況','carbopac','免疫禁忌、cisplatin 不適合時。'));
 }else{
  if(hi)o.push(T('首選','pembro','PD-L1 TPS ≥50%：免疫單藥。'),T('首選','kn189','高負荷、症狀明顯或快速進展時合併化療。'),T('替代','cemi','另一個 TPS ≥50% 的單藥選擇。'));
  else o.push(T('首選','kn189','非鱗狀第一線標準免疫合併化療；健保不需 PD-L1 報告。'));
  o.push(T('替代','abcp','肝轉移或需抗血管新生者可考慮；無大咳血、無腫瘤侵犯大血管。'),T('替代','tisnsq','健保限 SP263 TC ≥50%。'),T('替代','atezo','SP142 TC ≥50% 或 IC ≥10% 者之單藥選擇。'),T('特定情況','platpem','免疫禁忌時之化療。'));
 }
 return o;
}
function progressionNsclc(s){
 const o=[];
 if(s.marker==='egfr'){
  if(s.priorEgfr==='g12'&&s.t790m)o.push(T('首選','osi','T790M＋：第三代 TKI。'),T('替代','aumo','與 osimertinib 擇一。'));
  else o.push(T('首選','platpem','第三代 TKI 後或 T790M 陰性：含鉑雙藥；寡進展可續 TKI 加局部治療。'),T('替代','amichemo','MARIPOSA-2：osimertinib 後加 amivantamab 改善 PFS。'));
  o.push(T('特定情況','doce','含鉑後再惡化。'));
  return o;
 }
 if(s.marker==='alk'){
  if(s.priorAlk==='crizo')o.push(T('首選','brig','crizotinib 後之第二代 ALK TKI。'),T('替代','alec','中樞活性佳；健保後線未列。'));
  else if(s.priorAlk==='g2')o.push(T('首選','lorla','第二代 ALK TKI 後；可先再切片看抗藥突變。'));
  else o.push(T('首選','platpem','lorlatinib 後：含鉑＋pemetrexed（可加 bevacizumab）。'));
  return o;
 }
 if(s.marker==='ros1')return [T('首選','repo','crizotinib／entrectinib 後；對 G2032R 有活性。'),T('替代','platpem','標靶後化療。')];
 if(s.marker==='braf')return [T('首選','dabtram','含鉑後第二線（健保條文）。'),T('替代','doce','標靶後或不適合時。')];
 if(s.marker==='kras')return [T('首選','soto','KRAS G12C 後線。'),T('首選','adag','KRAS G12C 後線，中樞活性資料較多。'),T('替代','doce','標準後線化療。')];
 if(s.marker==='her2')return [T('首選','tdxd','HER2 活化突變後線。'),T('替代','zong','HER2 TKD 突變口服選擇（確認台灣許可）。'),T('替代','doce','標準後線化療。')];
 if(s.marker==='exon20')return [T('首選','amimono','含鉑後若未用過 amivantamab。'),T('替代','doce','後線化療。')];
 if(s.priorLine==='chemo1'||s.priorLine==='chemo2')o.push(T('首選','nivo2','未曾使用免疫者；健保限鱗狀第二線或腺癌第三線且 TC ≥50%。'),T('替代','pembro','TPS ≥1%（健保後線限 TPS ≥50%）。'));
 o.push(T(o.length?'替代':'首選','doce','免疫＋化療後之標準後線。'),T('替代','docram','體能良好、無出血風險者可加 ramucirumab。'));
 if(s.hist!=='squamous')o.push(T('特定情況','pem2','非鱗狀且未用過 pemetrexed。'));
 return o;
}
function options(s,pt){
 const sclc=s.hist==='sclc';
 if(sclc){
  if(s.setting==='limited')return s.phase==='postcrt'?[T('首選','adriatic','同步放化療後無惡化：延長整體存活（ADRIATIC）。')]:[T('首選','epls','根治性同步化放療；cisplatin 不適合時用 carboplatin AUC 5。')];
  if(s.phase==='progressed')return s.ctfi==='long'?[T('首選','rechal','停化療≥6個月復發：含鉑再挑戰。'),T('替代','tarla','後線雙特異性抗體，整體存活優於化療。')]:[T('首選','tarla','第二線：DeLLphi-304 整體存活優於化療。'),T('替代','lurbi','後線單藥。'),T('替代','topo','健保第二線給付之化療。'),...(s.ctfi==='mid'?[T('特定情況','rechal','停化療3–6個月：可考慮含鉑再挑戰。')]:[])];
  return [T('首選','atezoep','擴散期第一線化學免疫治療。'),T('首選','durvaep','cisplatin 或 carboplatin 均可。'),T('特定情況','epes','免疫禁忌或 ECOG ≥2：化療。')];
 }
 if(s.setting==='early')return [];
 if(s.setting==='resect'){
  if(s.marker==='egfr')return [T('首選','adjchemo','pⅡ–ⅢA：術後輔助化療。'),T('首選','adjosi','pⅠB–ⅢA EGFR Ex19del／L858R：改善 DFS 與整體存活。')];
  if(s.marker==='alk')return [T('首選','adjalec','pⅠB（≥4 cm）–ⅢA ALK＋：術後 alectinib 優於化療。'),T('替代','adjchemo','無法取得 alectinib 時。')];
  return [T('首選','neonivo','腫瘤 ≥4 cm 或淋巴結陽性：術前化學免疫提高 pCR 與 EFS。'),T('替代','periop','術前＋術後免疫（KEYNOTE-671）。'),T('替代','adjchemo','先手術者：pⅡ–ⅢA 術後輔助化療。'),T('特定情況','adjatezo','先手術且 PD-L1 ≥1%：輔助化療後再加。')];
 }
 if(s.setting==='unresect'){
  if(s.phase==='postcrt'){
   if(s.marker==='egfr')return [T('首選','osicons','EGFR Ex19del／L858R：LAURA 顯著延長 PFS。')];
   if(['none','kras','her2','braf','met','ret','ntrk'].includes(s.marker))return [T('首選','durvacons','無惡化且無≥2級肺炎：鞏固1年。')];
   return [];
  }
  return [T('首選','crtcp','體能可接受者之常用同步方案。'),T('首選','crtep','cisplatin 適合者。'),...(s.hist!=='squamous'?[T('替代','crtpem','非鱗狀，毒性較低。')]:[])];
 }
 // 轉移性
 if(s.phase==='progressed')return progressionNsclc(s);
 const m=s.marker;
 if(m==='egfr'){const o=[T('首選','osi','第一線標準；中樞活性佳。'),T('替代','osichemo','腦轉移、L858R 或高負荷者延長 PFS／OS。'),T('替代','amilaz','MARIPOSA：OS 優於 osimertinib，皮膚與 VTE 毒性較高。'),T('替代','aumo','健保第一線可給付之第三代 TKI。')];if(s.egfrType==='l858r'&&pt.brain!=='none'&&s.hist!=='squamous')o.push(T('特定情況','erlbev','L858R 合併腦轉移：健保有條文。'));o.push(T('特定情況','egfr12','第三代 TKI 不可近或不耐受時。'));return o;}
 if(m==='exon20')return [T('首選','amichemo','exon20 第一線。'),T('替代','platpem','無法使用 amivantamab 時。')];
 if(m==='alk')return [T('首選','alec','第一線標準，耐受性佳。'),T('首選','lorla','CROWN：最長 PFS 與最佳中樞控制；注意神經精神與血脂副作用。'),T('替代','brig','第一線另一選擇。'),T('特定情況','ceri','其他藥物不適合時。')];
 if(m==='ros1')return [T('首選','entrec','中樞活性佳。'),T('首選','crizo','經典 ROS1 TKI，中樞活性較弱。'),T('替代','repo','第一線 ORR 高（健保第一線未列）。')];
 if(m==='braf')return [T('首選','dabtram','第一線可考慮（健保限第二線）。'),T('替代','encobini','PHAROS。'),...nsclcFirstNoDriver(s,pt).filter(x=>x.tier==='首選').map(x=>({...x,tier:'替代',why:'先化學免疫治療，標靶留待第二線（符合健保順序）。'}))];
 if(m==='met')return [T('首選','tepo','MET exon14 第一線。'),T('替代','capma','另一個 MET TKI。')];
 if(m==='ret')return [T('首選','selper','第一線優於化學免疫治療（LIBRETTO-431）。'),T('替代','pralse','另一個 RET 抑制劑。'),...nsclcFirstNoDriver(s,pt).filter(x=>x.tier==='首選').map(x=>({...x,tier:'替代',why:'無法自費標靶時：健保給付之化學免疫治療。'}))];
 if(m==='ntrk')return [T('首選','laro','NTRK 融合。'),T('首選','entrec','中樞活性佳（健保 NTRK 未列）。')];
 return nsclcFirstNoDriver(s,pt); // none / kras / her2：第一線同無驅動
}

// ── 個案化警示 ──
function flagsFor(reg,s,pt){
 const f=[];let avoid=false;
 const names=reg.drugs.map(d=>d.n||'').join(' ');
 const hasPlat=reg.drugs.some(d=>d.plat);
 const cisBad=(pt.crcl&&pt.crcl<60)||pt.cisContra;
 if(hasPlat)f.push(cisBad?`Cisplatin 不適合（${pt.crcl&&pt.crcl<60?'CrCl <60':'聽力／神經病變／心衰或無法水化'}）：以 carboplatin 取代。`:'Cisplatin 需充分水化與止吐（NK1＋5-HT3＋dexamethasone±olanzapine）；也可用 carboplatin。');
 if(/Pemetrexed/.test(names)&&pt.crcl&&pt.crcl<45){f.push('CrCl <45：pemetrexed 不建議使用。');avoid=true;}
 if(/Etoposide/.test(names)&&pt.crcl&&pt.crcl>=15&&pt.crcl<=50)f.push('CrCl 15–50：etoposide 減為 75%。');
 if(/Topotecan/.test(names)&&pt.crcl&&pt.crcl<40)f.push('CrCl 20–39：topotecan IV 減為 0.75 mg/m²。');
 if(/Bevacizumab/.test(names)&&(s.hist==='squamous'||pt.hemoptysis)){f.push('鱗癌或咯血史：bevacizumab 出血風險，避免。');avoid=true;}
 if(reg.io&&pt.ioContra){f.push('活動性自體免疫疾病、器官移植或間質性肺病：免疫治療相對禁忌，須專科評估。');avoid=true;}
 if(reg.io&&s.priorLine==='tki')f.push('驅動基因陽性標靶後免疫效益低，osimertinib 後接免疫有肺炎風險。');
 if(/Osimertinib|Lorlatinib|Selpercatinib|Crizotinib|Entrectinib/.test(names))f.push('檢查交互作用（強效 CYP3A 誘導／抑制劑）及 QTc。');
 if(pt.brain==='symptomatic')f.push('症狀性腦轉移：先評估類固醇、SRS／手術；'+(reg.cns?'本方案中樞活性佳。':'本方案中樞活性有限。'));
 else if(pt.brain==='asymptomatic'&&reg.cns)f.push('具中樞活性，無症狀腦轉移可先全身治療並密切 MRI 追蹤。');
 if(pt.age>=75&&hasPlat)f.push('≥75 歲：評估老年評估（G8／CGA），可考慮 carboplatin 與減量。');
 if(/Amivantamab/.test(names)&&!pt.weight)f.push('輸入體重以決定 amivantamab 劑量級距。');
 if(/Zongertinib|Selpercatinib/.test(names)&&!pt.weight)f.push('輸入體重以決定劑量。');
 if(s.ps==='two'&&reg.io)f.push('ECOG 2：免疫治療證據有限，健保 9.69 須 ECOG ≤1。');
 return {flags:f,avoid};
}
function resolveDrugs(reg,pt){
 const cisBad=(pt.crcl&&pt.crcl<60)||pt.cisContra;
 return reg.drugs.map(d=>{
  if(!d.plat)return {...d,...doseText(d.d,pt)};
  const carbo={n:'Carboplatin',r:'IV',when:d.when,...doseText({auc:d.plat.auc},pt)},cis={n:'Cisplatin',r:'IV',when:d.when,...doseText({mgm2:d.plat.cis},pt)};
  return cisBad?{...carbo,note:'取代 cisplatin'}:{...cis,alt:carbo};
 });
}

export const GOALS={curative:['根治','以治癒為目標：完整局部治療（手術或放療）加上可降低復發的全身治療。'],control:['延長存活與控制疾病','無法根治：延長存活、控制症狀並維持生活品質；同步緩和照護。'],urgent:['先處理急症','穩定急症後再決定抗癌治療。']};
export function plan(s,pt={}){
 const g=decide(s);
 if(['urgent','incomplete','mismatch'].includes(g.kind)||(g.kind==='testing'))return {stop:g,goal:g.kind==='urgent'?GOALS.urgent:null,options:[]};
 const curative=['early','resect','unresect','limited'].includes(s.setting)&&s.phase!=='progressed';
 const goal=curative?GOALS.curative:GOALS.control;
 if(s.ps==='poor'&&!['egfr','alk','ros1','met','ret','ntrk','exon20'].includes(s.marker))return {goal,options:[],note:'ECOG 3–4 且無可作用驅動標記：以症狀控制與安寧緩和照護為主；若體能不佳主要由腫瘤造成，可由腫瘤科評估單藥化療。'};
 if(s.setting==='early')return {goal,options:[],note:'早期（無淋巴結轉移、≤4 cm）：首選肺葉切除（≤2 cm 周邊型可考慮肺節切除）加淋巴結評估；不適合手術者 SBRT（例如周邊 54 Gy／3 次、中央型 50–60 Gy／5–8 次）。ⅠA 期不需輔助全身治療；病理升期（>4 cm 或淋巴結陽性）請改選「可切除局部／淋巴結陽性」。'};
 let opts=options(s,pt);
 if(s.ps==='poor')opts=opts.filter(o=>!REG[o.id].io&&!REG[o.id].drugs.some(d=>d.plat||/Carboplatin|Cisplatin|Docetaxel|Paclitaxel/.test(d.n||'')));
 if(s.ps==='two'&&!sclcOrTarget(s))opts=[...opts.filter(o=>o.id!=='kn189'&&o.id!=='abcp'),{tier:'特定情況',id:'carbo1',why:'ECOG 2：單藥或含 carboplatin 雙藥較能耐受。'}];
 const out=opts.map(o=>{const reg=REG[o.id],{flags,avoid}=flagsFor(reg,s,pt);return {...o,reg,name:reg.name,drugs:resolveDrugs(reg,pt),cycle:reg.cycle,trial:reg.trial,pre:reg.pre||[],any:!!reg.any,nhi:reg.nhi(s,pt),flags,avoid};});
 const order={'首選':0,'替代':1,'特定情況':2};
 out.sort((a,b)=>(a.avoid-b.avoid)||order[a.tier]-order[b.tier]);
 const note=s.setting==='unresect'&&s.phase==='postcrt'&&!out.length?'ALK／ROS1 等其他驅動標記於放化療後無標準鞏固：定期影像追蹤，惡化時依轉移性路徑使用標靶。':'';
 return {goal,options:out,note};
}
const sclcOrTarget=s=>s.hist==='sclc'||['egfr','alk','ros1','met','ret','ntrk','exon20'].includes(s.marker);
export const NHI_LABEL={yes:'健保給付（條文相符）',cond:'健保有條件',fail:'健保條件不符',no:'健保未列（自費）'};
