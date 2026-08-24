// content/data/quarantine/destinations.ts
// ─────────────────────────────────────────────────────────────
// 해외 출국 검역 대상 국가 마스터 데이터.
// 원본 데이터 출처: 오늘동물병원 export_destinations · export_feasibility
//   (Supabase guides schema, 근거: QIA 2024 등).
//
// 이 파일은 원본 API 응답을 그대로 옮겨온 스냅샷입니다.
// 실제 프로덕션에서는 백엔드 API를 그대로 사용하는 것을 권장하며,
// 이 데이터는 오프라인 미리보기·개발용입니다.
// (규칙: .agents/rules/10-content-vs-code.md, 40-medical-safety.md)
//
// 마지막 스냅샷: 2026-08-24
// ─────────────────────────────────────────────────────────────

import type { Destination } from "@/lib/quarantine";

export const QUARANTINE_DESTINATIONS: Destination[] = [
  {
    "code": "EU",
    "country_name_ko": "EU",
    "country_name_en": "European Union",
    "region": "유럽",
    "service_level": "full",
    "sort_order": 10,
    "requires_titer": true,
    "titer_wait_days": 90,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "eu_ahc_2026_705",
    "notes": "한국=비등재 제3국→항체검사 필수(1차접종 30일후 & 발급 90일전 채혈, ≥0.5, 지정실험실). 에키노코쿠스는 FI·IE·MT·NO 등 disease-free 회원국행 개만(24~120h전). 수의사 작성+관할당국 배서, 10일 유효.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": 90,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-12-22",
        "done": false,
        "step": "채혈 후 90일 대기"
      }
    ],
    "earliest_departure_from_today": "2026-12-22",
    "source": "EU Reg 2026/705 Annex III",
    "source_verified": true,
    "import_permit_note": null
  },
  {
    "code": "UK",
    "country_name_ko": "영국·웨일스·스코틀랜드",
    "country_name_en": "United Kingdom",
    "region": "유럽",
    "service_level": "full",
    "sort_order": 11,
    "requires_titer": true,
    "titer_wait_days": 90,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "uk_pet_health_cert",
    "notes": "접종 30일후 채혈 + 3개월 대기. 개 촌충 출국 24~150h전. Pet Health Certificate 수의사 작성→검역관 배서.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": 90,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-12-22",
        "done": false,
        "step": "채혈 후 90일 대기"
      }
    ],
    "earliest_departure_from_today": "2026-12-22",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "RU",
    "country_name_ko": "러시아",
    "country_name_en": "Russia",
    "region": "유럽",
    "service_level": "full",
    "sort_order": 12,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "ru_cert",
    "notes": "백신 입국 21일전~12개월. 입국공항 3곳. 러시아 검역증명서 별도(출국 5일내 발급).",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "US_noncomm",
    "country_name_ko": "미국(본토) 비상업",
    "country_name_en": "United States",
    "region": "미주",
    "service_level": "full",
    "sort_order": 20,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 6,
    "health_cert_model": "base_9_1",
    "notes": "광견병백신 권장(주별 상이). 핵심=CDC Dog Import Form(개·보호자). 한국 6개월거주/한국출생 증명. ※고위험국 6개월내 방문 시 항체검사+28일 계류(한국 해당없음). [CDC 9.5(저위험국) 인증서는 설계상 검사수의사 작성·검역관 배서 — 발급 동물병원이 작성하는지 검역관이 겸하는지 검역본부 확인 필요. 기본 base_9_1, 확인되면 us_cdc_lowrisk 선택 렌더러 활성화]",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 6,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": true,
      "requires_other_vacc": false,
      "requires_rabies_vacc": false,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-08-24",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "US_hawaii",
    "country_name_ko": "미국(하와이)",
    "country_name_en": "United States (Hawaii)",
    "region": "미주",
    "service_level": "full",
    "sort_order": 21,
    "requires_titer": true,
    "titer_wait_days": 30,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 5,
    "min_age_months": 4,
    "health_cert_model": "us_hawaii",
    "notes": "5 Day-or-Less/DAR. FAVN, 채혈후 최소 30일. 도착 14일내 진드기 처치. AQS-279.",
    "requires_other_vacc": false,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 4,
      "requires_titer": true,
      "quarantine_days": 5,
      "quarantine_type": "facility",
      "requires_neuter": false,
      "titer_wait_days": 30,
      "rabies_min_doses": 1,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-10-23",
        "done": false,
        "step": "채혈 후 30일 대기"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역 5일"
      }
    ],
    "earliest_departure_from_today": "2026-10-23",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "US_guam",
    "country_name_ko": "미국(괌)",
    "country_name_en": "United States (Guam)",
    "region": "미주",
    "service_level": "full",
    "sort_order": 22,
    "requires_titer": true,
    "titer_wait_days": 120,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": null,
    "min_age_months": 5,
    "health_cert_model": "us_guam",
    "notes": "채혈후 최소 120일. Entry Permit. 도착 14일내 심장사상충+외부구제. OIE-FAVN cert.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 5,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": 120,
      "rabies_min_doses": 1,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2027-01-21",
        "done": false,
        "step": "채혈 후 120일 대기"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역"
      }
    ],
    "earliest_departure_from_today": "2027-01-21",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "CA_noncomm",
    "country_name_ko": "캐나다 비상업",
    "country_name_en": "Canada",
    "region": "미주",
    "service_level": "full",
    "sort_order": 23,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "base_9_1",
    "notes": "광견병 3개월+ 대기없음. 항체·수입허가·계류 불필요. 안내견 면제조건 별도.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "PA",
    "country_name_ko": "파나마",
    "country_name_en": "Panama",
    "region": "미주",
    "service_level": "full",
    "sort_order": 24,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": true,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "입국 후 자가격리(Home Quarantine 신청). 건강증명서 대사관 공증(Apostille) 필요.",
    "requires_other_vacc": false,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": "home",
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 자가 격리"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "JP",
    "country_name_ko": "일본",
    "country_name_en": "Japan",
    "region": "동아시아",
    "service_level": "full",
    "sort_order": 30,
    "requires_titer": true,
    "titer_wait_days": 180,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 10,
    "health_cert_model": "jp_form_ac",
    "notes": "1차 91일령+, 2차 30일경과. 채혈후 180일~24개월내 입국. 도착 40일전 사전신고. Form AC 수의사 작성→검역관 배서.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 10,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": 180,
      "rabies_min_doses": 2,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": 30
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 후 30일 이상 경과",
        "step": "광견병 2차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "2차 접종 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2027-03-22",
        "done": false,
        "step": "채혈 후 180일 대기"
      }
    ],
    "earliest_departure_from_today": "2027-03-22",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "CN",
    "country_name_ko": "중국",
    "country_name_en": "China",
    "region": "동아시아",
    "service_level": "full",
    "sort_order": 31,
    "requires_titer": true,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "백신 2회. 항체 ≥0.5(1년 인정, 채혈은 2차접종 당일/이후). 1인 1마리. 베이징 장기체류 시 허가.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 2,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 후 30일 이상 경과",
        "step": "광견병 2차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "2차 접종 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "step": "채혈 후 0일 대기"
      }
    ],
    "earliest_departure_from_today": "2026-09-23",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "TW",
    "country_name_ko": "대만",
    "country_name_en": "Taiwan",
    "region": "동아시아",
    "service_level": "full",
    "sort_order": 32,
    "requires_titer": true,
    "titer_wait_days": 90,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 7,
    "min_age_months": 6,
    "health_cert_model": "tw_baphiq_002",
    "notes": "불활화백신 30일~1년. 채혈 90일~1년전. 도착 7일 계류. BAPHIQ Form 002. 핏불 금지.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 6,
      "requires_titer": true,
      "quarantine_days": 7,
      "quarantine_type": "facility",
      "requires_neuter": false,
      "titer_wait_days": 90,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-12-22",
        "done": false,
        "step": "채혈 후 90일 대기"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역 7일"
      }
    ],
    "earliest_departure_from_today": "2026-12-22",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "HK",
    "country_name_ko": "홍콩",
    "country_name_en": "Hong Kong",
    "region": "동아시아",
    "service_level": "full",
    "sort_order": 33,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 5,
    "health_cert_model": "hk_ahc",
    "notes": "백신 입국 30일전~12개월. DHPPL/FVRCP. Special Permit(6개월 유효). AHC Part B 동물병원/Part C 검역.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 5,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "SG",
    "country_name_ko": "싱가포르",
    "country_name_en": "Singapore",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 40,
    "requires_titer": true,
    "titer_wait_days": 30,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 10,
    "min_age_months": null,
    "health_cert_model": "sg_vet_cert",
    "notes": "1차 출국 4개월전·2차 1개월전. 채혈 접종 30일후 & 출국 6개월내. 한국 6개월거주. 계류 10/30일. Vet Cert 동물병원 초안→검역 배서.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": true,
      "quarantine_days": 10,
      "quarantine_type": "facility",
      "requires_neuter": false,
      "titer_wait_days": 30,
      "rabies_min_doses": 2,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": 90
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-11-22",
        "done": false,
        "note": "1차 접종 후 90일 이상 경과",
        "step": "광견병 2차 접종"
      },
      {
        "date": "2026-11-22",
        "done": false,
        "note": "2차 접종 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-12-22",
        "done": false,
        "step": "채혈 후 30일 대기"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역 10일"
      }
    ],
    "earliest_departure_from_today": "2026-12-22",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "VN",
    "country_name_ko": "베트남",
    "country_name_en": "Vietnam",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 41,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "백신 30일~1년. 항체·수입허가·계류 불필요.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "IN",
    "country_name_ko": "인도",
    "country_name_en": "India",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 42,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "in_annexure",
    "notes": "이주목적만(관광·사업비자 불가). 도착 7일전 NOC 신청. Annexure 1.1.1(개)/1.1.2(고양이). 인당 2마리.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "PH",
    "country_name_ko": "필리핀",
    "country_name_en": "Philippines",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 43,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "base_9_1",
    "notes": "도착 10일전 온라인 수입허가. DHPPL/FVRCP·기생충 필수.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "TH",
    "country_name_ko": "태국",
    "country_name_en": "Thailand",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 44,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 4,
    "health_cert_model": "base_9_1",
    "notes": "1차후 21일경과. DHPPL+Lepto/FVRCP. 수입허가는 공항별(치앙마이·푸껫). 핏불 금지.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 4,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "ID",
    "country_name_ko": "인도네시아",
    "country_name_en": "Indonesia",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 45,
    "requires_titer": true,
    "titer_wait_days": 30,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 14,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "사백신 출국 21일전. FAVN 접종 30일후 & 출국 30일전. 1달전 수입허가(14일 소요). 계류 3~14일. 발리 등 위험지역 불가.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": true,
      "quarantine_days": 14,
      "quarantine_type": "facility",
      "requires_neuter": false,
      "titer_wait_days": 30,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-10-23",
        "done": false,
        "step": "채혈 후 30일 대기"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역 14일"
      }
    ],
    "earliest_departure_from_today": "2026-10-23",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "MY",
    "country_name_ko": "말레이시아",
    "country_name_en": "Malaysia",
    "region": "동남아·남아시아",
    "service_level": "full",
    "sort_order": 46,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 7,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "코타키나발루 제외. MAQIS 수입허가. 계류 최소 7일.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": 7,
      "quarantine_type": "facility",
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": true,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "at": "arrival",
        "date": null,
        "done": false,
        "step": "도착 후 계류검역 7일"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "AE",
    "country_name_ko": "UAE",
    "country_name_en": "United Arab Emirates",
    "region": "중동",
    "service_level": "full",
    "sort_order": 50,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "ae_model_hc",
    "notes": "DHPPL/FVRCP·기생충(14일내). 수입허가(30일 유효). 검역증명서 출국 24h내. Model Health Certificate.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": true,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "SA",
    "country_name_ko": "사우디아라비아",
    "country_name_en": "Saudi Arabia",
    "region": "중동",
    "service_level": "full",
    "sort_order": 51,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 4,
    "health_cert_model": "base_9_1",
    "notes": "영주권자만. 백신 1달전~6개월. 수입허가 15일전. 6개월에 2마리.",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 4,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "QA",
    "country_name_ko": "카타르",
    "country_name_en": "Qatar",
    "region": "중동",
    "service_level": "full",
    "sort_order": 52,
    "requires_titer": true,
    "titer_wait_days": 90,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 4,
    "health_cert_model": "base_9_1",
    "notes": "접종 30일후 채혈 + 3개월 대기. DHPPL/FVRCP. 중성화 필수. 수입허가(30일 유효).",
    "requires_other_vacc": true,
    "requires_parasite": false,
    "requires_neuter": true,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 4,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": true,
      "titer_wait_days": 90,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": true,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": true,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-12-22",
        "done": false,
        "step": "채혈 후 90일 대기"
      }
    ],
    "earliest_departure_from_today": "2026-12-22",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": "사전수입허가는 보호자가 직접 신청하셔야 해요. 리드타임을 확인해 주세요."
  },
  {
    "code": "MN",
    "country_name_ko": "몽골",
    "country_name_en": "Mongolia",
    "region": "기타",
    "service_level": "full",
    "sort_order": 60,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 3,
    "health_cert_model": "base_9_1",
    "notes": "백신 입국 30일전. Chinggis Khaan 공항 입국. 출국 10일내 발급.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": 3,
      "requires_titer": false,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      }
    ],
    "earliest_departure_from_today": "2026-09-14",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "MA",
    "country_name_ko": "모로코",
    "country_name_en": "Morocco",
    "region": "기타",
    "service_level": "full",
    "sort_order": 61,
    "requires_titer": true,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "base_9_1",
    "notes": "불활화백신 1차후 21일. 항체 성적서 검역관 서명후 제출. 출국 24h내 수의검사. 무하마드V 공항. 핏불 금지.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "titer_min_iu": 0.5,
      "min_age_months": null,
      "requires_titer": true,
      "quarantine_days": null,
      "quarantine_type": null,
      "requires_neuter": false,
      "titer_wait_days": null,
      "rabies_min_doses": 1,
      "requires_parasite": false,
      "rabies_recommended": false,
      "requires_other_vacc": false,
      "requires_rabies_vacc": true,
      "quarantine_on_arrival": false,
      "requires_import_permit": false,
      "rabies_dose_interval_days": null
    },
    "default_steps": [
      {
        "date": "2026-08-24",
        "done": false,
        "step": "마이크로칩 이식"
      },
      {
        "date": "2026-08-24",
        "done": false,
        "note": null,
        "step": "광견병 1차 접종"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "note": "1차 접종 +30일 이후, 결과 0.5 IU/ml 이상",
        "step": "광견병 항체검사 채혈"
      },
      {
        "date": "2026-09-23",
        "done": false,
        "step": "채혈 후 0일 대기"
      }
    ],
    "earliest_departure_from_today": "2026-09-23",
    "source": "QIA 2024",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "AU_dog",
    "country_name_ko": "호주(개)",
    "country_name_en": "Australia (dog)",
    "region": "오세아니아",
    "service_level": "advisory_only",
    "sort_order": 70,
    "requires_titer": true,
    "titer_wait_days": 180,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 10,
    "min_age_months": null,
    "health_cert_model": "advisory",
    "notes": "헤비: 추가 혈액검사(Brucella·Leishmania·Leptospira 등)+다중 선언서. 오늘동물병원 미진행 → 전문병원 안내.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "requires_titer": true,
      "requires_neuter": false,
      "titer_wait_days": 180,
      "requires_parasite": true,
      "requires_other_vacc": true,
      "quarantine_on_arrival": true
    },
    "default_steps": [],
    "earliest_departure_from_today": null,
    "source": "",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "AU_cat",
    "country_name_ko": "호주(고양이)",
    "country_name_en": "Australia (cat)",
    "region": "오세아니아",
    "service_level": "advisory_only",
    "sort_order": 71,
    "requires_titer": true,
    "titer_wait_days": 180,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 10,
    "min_age_months": null,
    "health_cert_model": "advisory",
    "notes": "헤비. 오늘동물병원 미진행 → 전문병원 안내.",
    "requires_other_vacc": false,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "requires_titer": true,
      "requires_neuter": false,
      "titer_wait_days": 180,
      "requires_parasite": true,
      "requires_other_vacc": false,
      "quarantine_on_arrival": true
    },
    "default_steps": [],
    "earliest_departure_from_today": null,
    "source": "",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "NZ",
    "country_name_ko": "뉴질랜드",
    "country_name_en": "New Zealand",
    "region": "오세아니아",
    "service_level": "advisory_only",
    "sort_order": 72,
    "requires_titer": true,
    "titer_wait_days": 90,
    "requires_import_permit": true,
    "quarantine_on_arrival": true,
    "quarantine_days": 10,
    "min_age_months": 9,
    "health_cert_model": "advisory",
    "notes": "헤비: 추가검사+선언서 다수. 오늘동물병원 미진행 → 전문병원 안내.",
    "requires_other_vacc": false,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "requires_titer": true,
      "requires_neuter": false,
      "titer_wait_days": 90,
      "requires_parasite": true,
      "requires_other_vacc": false,
      "quarantine_on_arrival": true
    },
    "default_steps": [],
    "earliest_departure_from_today": null,
    "source": "",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "US_commercial",
    "country_name_ko": "미국 상업",
    "country_name_en": "United States (commercial)",
    "region": "미주",
    "service_level": "advisory_only",
    "sort_order": 80,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": true,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": 6,
    "health_cert_model": "advisory",
    "notes": "상업용(AWA Form 7041). 오늘동물병원 미진행.",
    "requires_other_vacc": true,
    "requires_parasite": true,
    "requires_neuter": false,
    "requirements": {
      "requires_titer": false,
      "requires_neuter": false,
      "titer_wait_days": null,
      "requires_parasite": true,
      "requires_other_vacc": true,
      "quarantine_on_arrival": false
    },
    "default_steps": [],
    "earliest_departure_from_today": null,
    "source": "",
    "source_verified": false,
    "import_permit_note": null
  },
  {
    "code": "CA_commercial",
    "country_name_ko": "캐나다 상업",
    "country_name_en": "Canada (commercial)",
    "region": "미주",
    "service_level": "advisory_only",
    "sort_order": 81,
    "requires_titer": false,
    "titer_wait_days": null,
    "requires_import_permit": false,
    "quarantine_on_arrival": false,
    "quarantine_days": null,
    "min_age_months": null,
    "health_cert_model": "advisory",
    "notes": "상업용. 오늘동물병원 미진행. 고양이 상업 불가.",
    "requires_other_vacc": false,
    "requires_parasite": false,
    "requires_neuter": false,
    "requirements": {
      "requires_titer": false,
      "requires_neuter": false,
      "titer_wait_days": null,
      "requires_parasite": false,
      "requires_other_vacc": false,
      "quarantine_on_arrival": false
    },
    "default_steps": [],
    "earliest_departure_from_today": null,
    "source": "",
    "source_verified": false,
    "import_permit_note": null
  }
];
