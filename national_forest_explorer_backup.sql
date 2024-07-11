--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Postgres.app)
-- Dumped by pg_dump version 16.3 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Campsites; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Campsites" (
    id integer NOT NULL,
    "facilityId" character varying(50),
    name character varying(255),
    type character varying(255),
    latitude double precision,
    longitude double precision,
    "mapUrl" character varying(255),
    phone character varying(50),
    email character varying(255),
    description text,
    "useFeeDescription" text,
    reservable boolean,
    "adaAccess" character varying(255),
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."Campsites" OWNER TO mfoster;

--
-- Name: Comments; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    text character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Comments" OWNER TO mfoster;

--
-- Name: Forests; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Forests" (
    id integer NOT NULL,
    "adminForestId" character varying(50),
    region character varying(50),
    "forestNumber" character varying(50),
    "forestOrgCode" character varying(50),
    name character varying(255),
    "gisAcres" double precision,
    "shapeLength" double precision,
    "shapeArea" double precision,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Forests" OWNER TO mfoster;

--
-- Name: Itineraries; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Itineraries" (
    id integer NOT NULL,
    "userId" integer,
    name character varying(255),
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Itineraries" OWNER TO mfoster;

--
-- Name: ItineraryItems; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."ItineraryItems" (
    id integer NOT NULL,
    "itineraryId" integer,
    "forestId" integer,
    "trailId" integer,
    "campsiteId" integer,
    date timestamp with time zone,
    "time" time without time zone,
    note character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ItineraryItems" OWNER TO mfoster;

--
-- Name: Photos; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Photos" (
    id integer NOT NULL,
    "userId" integer,
    "forestId" integer,
    "trailId" integer,
    "campsiteId" integer,
    url character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Photos" OWNER TO mfoster;

--
-- Name: Posts; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    "postType" character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    rating integer,
    "reviewText" text,
    photos character varying(255)[],
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Posts" OWNER TO mfoster;

--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    "userId" integer,
    "forestId" integer,
    "trailId" integer,
    "campsiteId" integer,
    rating integer,
    comment character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "postId" integer
);


ALTER TABLE public."Reviews" OWNER TO mfoster;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO mfoster;

--
-- Name: Trails; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Trails" (
    id integer NOT NULL,
    "trailId" character varying(50),
    name character varying(255),
    type character varying(50),
    "segmentLength" double precision,
    "managingOrg" character varying(255),
    "accessibilityStatus" character varying(255),
    "trailSurface" character varying(255),
    "allowedTerraUse" character varying(255),
    "allowedSnowUse" character varying(255),
    "allowedWaterUse" character varying(255),
    "typicalTrailGrade" character varying(255),
    "typicalTreadWidth" character varying(255),
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Trails" OWNER TO mfoster;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: mfoster
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255),
    "passwordHash" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "profilePicture" character varying(255),
    "coverPhoto" character varying(255),
    "profilePhoto" character varying(255)
);


ALTER TABLE public."Users" OWNER TO mfoster;

--
-- Name: campsitesIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."campsitesIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."campsitesIdSeq" OWNER TO mfoster;

--
-- Name: campsitesIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."campsitesIdSeq" OWNED BY public."Campsites".id;


--
-- Name: commentsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."commentsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."commentsIdSeq" OWNER TO mfoster;

--
-- Name: commentsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."commentsIdSeq" OWNED BY public."Comments".id;


--
-- Name: forestsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."forestsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."forestsIdSeq" OWNER TO mfoster;

--
-- Name: forestsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."forestsIdSeq" OWNED BY public."Forests".id;


--
-- Name: itinerariesIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."itinerariesIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."itinerariesIdSeq" OWNER TO mfoster;

--
-- Name: itinerariesIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."itinerariesIdSeq" OWNED BY public."Itineraries".id;


--
-- Name: itineraryItemsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."itineraryItemsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."itineraryItemsIdSeq" OWNER TO mfoster;

--
-- Name: itineraryItemsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."itineraryItemsIdSeq" OWNED BY public."ItineraryItems".id;


--
-- Name: photosIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."photosIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."photosIdSeq" OWNER TO mfoster;

--
-- Name: photosIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."photosIdSeq" OWNED BY public."Photos".id;


--
-- Name: postsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."postsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."postsIdSeq" OWNER TO mfoster;

--
-- Name: postsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."postsIdSeq" OWNED BY public."Posts".id;


--
-- Name: reviewsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."reviewsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."reviewsIdSeq" OWNER TO mfoster;

--
-- Name: reviewsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."reviewsIdSeq" OWNED BY public."Reviews".id;


--
-- Name: trailsIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."trailsIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."trailsIdSeq" OWNER TO mfoster;

--
-- Name: trailsIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."trailsIdSeq" OWNED BY public."Trails".id;


--
-- Name: usersIdSeq; Type: SEQUENCE; Schema: public; Owner: mfoster
--

CREATE SEQUENCE public."usersIdSeq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."usersIdSeq" OWNER TO mfoster;

--
-- Name: usersIdSeq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfoster
--

ALTER SEQUENCE public."usersIdSeq" OWNED BY public."Users".id;


--
-- Name: Campsites id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Campsites" ALTER COLUMN id SET DEFAULT nextval('public."campsitesIdSeq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."commentsIdSeq"'::regclass);


--
-- Name: Forests id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Forests" ALTER COLUMN id SET DEFAULT nextval('public."forestsIdSeq"'::regclass);


--
-- Name: Itineraries id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Itineraries" ALTER COLUMN id SET DEFAULT nextval('public."itinerariesIdSeq"'::regclass);


--
-- Name: ItineraryItems id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."ItineraryItems" ALTER COLUMN id SET DEFAULT nextval('public."itineraryItemsIdSeq"'::regclass);


--
-- Name: Photos id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Photos" ALTER COLUMN id SET DEFAULT nextval('public."photosIdSeq"'::regclass);


--
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."postsIdSeq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."reviewsIdSeq"'::regclass);


--
-- Name: Trails id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Trails" ALTER COLUMN id SET DEFAULT nextval('public."trailsIdSeq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."usersIdSeq"'::regclass);


--
-- Data for Name: Campsites; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Campsites" (id, "facilityId", name, type, latitude, longitude, "mapUrl", phone, email, description, "useFeeDescription", reservable, "adaAccess", "createdAt", "updatedAt") FROM stdin;
55	233684	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.302793-07	2024-07-10 16:31:39.302793-07
145	233379	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.351767-07	2024-07-10 16:31:39.351767-07
146	233647	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.352167-07	2024-07-10 16:31:39.352167-07
53	258799	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.301769-07	2024-07-10 16:31:39.301769-07
46	232381	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.298096-07	2024-07-10 16:31:39.298096-07
178	247785	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.363692-07	2024-07-10 16:31:39.363692-07
93	231985	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.326473-07	2024-07-10 16:31:39.326473-07
39	232408	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.291163-07	2024-07-10 16:31:39.291163-07
30	272300	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.283689-07	2024-07-10 16:31:39.283689-07
88	10116524	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.322668-07	2024-07-10 16:31:39.322668-07
63	259170	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.30697-07	2024-07-10 16:31:39.30697-07
43	231986	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.295961-07	2024-07-10 16:31:39.295961-07
76	122490	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.315044-07	2024-07-10 16:31:39.315044-07
103	258830	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.332373-07	2024-07-10 16:31:39.332373-07
58	234049	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.304503-07	2024-07-10 16:31:39.304503-07
19	232432	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.272991-07	2024-07-10 16:31:39.272991-07
85	233359	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.320976-07	2024-07-10 16:31:39.320976-07
20	232604	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.273974-07	2024-07-10 16:31:39.273974-07
77	10218892	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.315782-07	2024-07-10 16:31:39.315782-07
99	233789	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.330117-07	2024-07-10 16:31:39.330117-07
152	232504	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.354122-07	2024-07-10 16:31:39.354122-07
83	10048096	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.319924-07	2024-07-10 16:31:39.319924-07
51	259242	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.300783-07	2024-07-10 16:31:39.300783-07
3	10053729	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.793559-07	2024-07-10 16:27:21.793559-07
134	233692	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.346652-07	2024-07-10 16:31:39.346652-07
91	232274	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.325297-07	2024-07-10 16:31:39.325297-07
106	234374	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.334058-07	2024-07-10 16:31:39.334058-07
110	10048028	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.336023-07	2024-07-10 16:31:39.336023-07
112	233621	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.336856-07	2024-07-10 16:31:39.336856-07
2	251840	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.792152-07	2024-07-10 16:27:21.792152-07
73	10215924	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.313057-07	2024-07-10 16:31:39.313057-07
65	233258	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.308013-07	2024-07-10 16:31:39.308013-07
37	10038980	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.289789-07	2024-07-10 16:31:39.289789-07
129	231929	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.344258-07	2024-07-10 16:31:39.344258-07
138	10108391	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.349-07	2024-07-10 16:31:39.349-07
64	233624	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.307448-07	2024-07-10 16:31:39.307448-07
57	10047895	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.303987-07	2024-07-10 16:31:39.303987-07
34	10040622	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.287596-07	2024-07-10 16:31:39.287596-07
33	232723	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.286647-07	2024-07-10 16:31:39.286647-07
78	10007181	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.316449-07	2024-07-10 16:31:39.316449-07
126	232384	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.342796-07	2024-07-10 16:31:39.342796-07
122	232103	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.341105-07	2024-07-10 16:31:39.341105-07
140	234140	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.349792-07	2024-07-10 16:31:39.349792-07
1	10049834	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.784236-07	2024-07-10 16:27:21.784236-07
17	233732	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.269839-07	2024-07-10 16:31:39.269839-07
66	233694	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.308777-07	2024-07-10 16:31:39.308777-07
80	10047905	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.31766-07	2024-07-10 16:31:39.31766-07
116	10054711	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.338633-07	2024-07-10 16:31:39.338633-07
163	10039993	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.35822-07	2024-07-10 16:31:39.35822-07
18	232858	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.271868-07	2024-07-10 16:31:39.271868-07
27	232151	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.280865-07	2024-07-10 16:31:39.280865-07
125	232201	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.342368-07	2024-07-10 16:31:39.342368-07
25	10047969	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.278722-07	2024-07-10 16:31:39.278722-07
24	232130	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.277691-07	2024-07-10 16:31:39.277691-07
29	118290	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.282782-07	2024-07-10 16:31:39.282782-07
148	232465	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.352822-07	2024-07-10 16:31:39.352822-07
40	233609	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.293227-07	2024-07-10 16:31:39.293227-07
6	232516	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.796853-07	2024-07-10 16:27:21.796853-07
151	233714	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.35379-07	2024-07-10 16:31:39.35379-07
41	234762	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.294213-07	2024-07-10 16:31:39.294213-07
142	10047057	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.350573-07	2024-07-10 16:31:39.350573-07
35	233486	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.288342-07	2024-07-10 16:31:39.288342-07
36	233631	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.289066-07	2024-07-10 16:31:39.289066-07
47	10296977	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.298626-07	2024-07-10 16:31:39.298626-07
5	232600	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.795805-07	2024-07-10 16:27:21.795805-07
52	10048215	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.301257-07	2024-07-10 16:31:39.301257-07
79	234192	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.317088-07	2024-07-10 16:31:39.317088-07
153	232753	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.354442-07	2024-07-10 16:31:39.354442-07
23	233119	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.276689-07	2024-07-10 16:31:39.276689-07
86	247592	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.321525-07	2024-07-10 16:31:39.321525-07
90	10210112	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.324737-07	2024-07-10 16:31:39.324737-07
92	231933	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.325855-07	2024-07-10 16:31:39.325855-07
95	233198	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.327815-07	2024-07-10 16:31:39.327815-07
101	119190	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.331298-07	2024-07-10 16:31:39.331298-07
107	10132201	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.334603-07	2024-07-10 16:31:39.334603-07
109	10047984	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.335533-07	2024-07-10 16:31:39.335533-07
115	232029	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.338156-07	2024-07-10 16:31:39.338156-07
60	234411	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.305508-07	2024-07-10 16:31:39.305508-07
61	10243280	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.305967-07	2024-07-10 16:31:39.305967-07
7	234488	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.797439-07	2024-07-10 16:27:21.797439-07
68	262815	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.309921-07	2024-07-10 16:31:39.309921-07
130	122940	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.344736-07	2024-07-10 16:31:39.344736-07
49	232125	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.299753-07	2024-07-10 16:31:39.299753-07
54	10235835	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.302251-07	2024-07-10 16:31:39.302251-07
132	232071	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.345738-07	2024-07-10 16:31:39.345738-07
137	234190	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.348594-07	2024-07-10 16:31:39.348594-07
56	233100	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.303383-07	2024-07-10 16:31:39.303383-07
48	258617	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.299201-07	2024-07-10 16:31:39.299201-07
96	233730	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.328417-07	2024-07-10 16:31:39.328417-07
128	231930	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.343746-07	2024-07-10 16:31:39.343746-07
42	10207636	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.295141-07	2024-07-10 16:31:39.295141-07
375	233649	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.417014-07	2024-07-10 16:31:39.417014-07
336	233693	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.409297-07	2024-07-10 16:31:39.409297-07
447	234191	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.432204-07	2024-07-10 16:31:39.432204-07
293	233228	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.39738-07	2024-07-10 16:31:39.39738-07
331	10083567	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.408316-07	2024-07-10 16:31:39.408316-07
400	232416	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.42265-07	2024-07-10 16:31:39.42265-07
302	10003362	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.399289-07	2024-07-10 16:31:39.399289-07
430	247603	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.428788-07	2024-07-10 16:31:39.428788-07
449	254094	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.432589-07	2024-07-10 16:31:39.432589-07
291	233514	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.396914-07	2024-07-10 16:31:39.396914-07
324	232226	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.406928-07	2024-07-10 16:31:39.406928-07
264	10040569	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.389731-07	2024-07-10 16:31:39.389731-07
314	232718	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.402844-07	2024-07-10 16:31:39.402844-07
398	232183	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.422209-07	2024-07-10 16:31:39.422209-07
321	233313	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.406309-07	2024-07-10 16:31:39.406309-07
453	10214622	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.433571-07	2024-07-10 16:31:39.433571-07
241	234053	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.383254-07	2024-07-10 16:31:39.383254-07
445	251838	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.431816-07	2024-07-10 16:31:39.431816-07
268	10291477	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.390808-07	2024-07-10 16:31:39.390808-07
338	234593	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.409701-07	2024-07-10 16:31:39.409701-07
359	10040591	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.413841-07	2024-07-10 16:31:39.413841-07
263	233622	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.389406-07	2024-07-10 16:31:39.389406-07
337	234214	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.40951-07	2024-07-10 16:31:39.40951-07
318	251470	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.404019-07	2024-07-10 16:31:39.404019-07
347	251609	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.411497-07	2024-07-10 16:31:39.411497-07
358	246096	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.413644-07	2024-07-10 16:31:39.413644-07
355	233526	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.413059-07	2024-07-10 16:31:39.413059-07
285	232607	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.395364-07	2024-07-10 16:31:39.395364-07
332	232108	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.408525-07	2024-07-10 16:31:39.408525-07
284	233683	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.395124-07	2024-07-10 16:31:39.395124-07
312	10234885	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.402352-07	2024-07-10 16:31:39.402352-07
372	10234967	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.416375-07	2024-07-10 16:31:39.416375-07
334	232894	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.408893-07	2024-07-10 16:31:39.408893-07
251	232573	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.386085-07	2024-07-10 16:31:39.386085-07
322	233444	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.406519-07	2024-07-10 16:31:39.406519-07
402	256933	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.42309-07	2024-07-10 16:31:39.42309-07
467	10060948	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.436341-07	2024-07-10 16:31:39.436341-07
301	233897	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.399089-07	2024-07-10 16:31:39.399089-07
307	231944	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.400295-07	2024-07-10 16:31:39.400295-07
494	232104	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.441677-07	2024-07-10 16:31:39.441677-07
190	10020625	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.367749-07	2024-07-10 16:31:39.367749-07
417	231855	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.426146-07	2024-07-10 16:31:39.426146-07
340	232589	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.410097-07	2024-07-10 16:31:39.410097-07
299	232474	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.398679-07	2024-07-10 16:31:39.398679-07
414	233603	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.425526-07	2024-07-10 16:31:39.425526-07
309	232105	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.400679-07	2024-07-10 16:31:39.400679-07
369	231979	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.415804-07	2024-07-10 16:31:39.415804-07
415	10054775	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.425744-07	2024-07-10 16:31:39.425744-07
361	233599	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.414224-07	2024-07-10 16:31:39.414224-07
364	118440	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.414805-07	2024-07-10 16:31:39.414805-07
412	234500	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.425098-07	2024-07-10 16:31:39.425098-07
499	240958	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.442715-07	2024-07-10 16:31:39.442715-07
341	10190963	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.410292-07	2024-07-10 16:31:39.410292-07
4	258796	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:27:21.794453-07	2024-07-10 16:27:21.794453-07
367	10040547	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.415413-07	2024-07-10 16:31:39.415413-07
492	231945	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.441294-07	2024-07-10 16:31:39.441294-07
245	10104819	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.384385-07	2024-07-10 16:31:39.384385-07
265	10083845	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.390008-07	2024-07-10 16:31:39.390008-07
258	232540	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.388029-07	2024-07-10 16:31:39.388029-07
239	233395	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.38272-07	2024-07-10 16:31:39.38272-07
273	254084	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.392061-07	2024-07-10 16:31:39.392061-07
67	233733	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.30938-07	2024-07-10 16:31:39.30938-07
250	233449	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.385804-07	2024-07-10 16:31:39.385804-07
413	233763	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.425296-07	2024-07-10 16:31:39.425296-07
227	10048898	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.3792-07	2024-07-10 16:31:39.3792-07
191	10158480	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.368452-07	2024-07-10 16:31:39.368452-07
255	10004300	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.387254-07	2024-07-10 16:31:39.387254-07
139	10231392	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.349408-07	2024-07-10 16:31:39.349408-07
456	233187	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.434177-07	2024-07-10 16:31:39.434177-07
199	232917	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.370751-07	2024-07-10 16:31:39.370751-07
485	233973	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.439978-07	2024-07-10 16:31:39.439978-07
240	233626	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.38299-07	2024-07-10 16:31:39.38299-07
462	251616	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.435324-07	2024-07-10 16:31:39.435324-07
249	232549	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.385526-07	2024-07-10 16:31:39.385526-07
458	247867	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.434558-07	2024-07-10 16:31:39.434558-07
368	233643	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.415612-07	2024-07-10 16:31:39.415612-07
460	234219	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.434948-07	2024-07-10 16:31:39.434948-07
287	10212065	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.395943-07	2024-07-10 16:31:39.395943-07
297	258795	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.398272-07	2024-07-10 16:31:39.398272-07
451	231846	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.432983-07	2024-07-10 16:31:39.432983-07
370	234040	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.415992-07	2024-07-10 16:31:39.415992-07
373	251906	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2024-07-10 16:31:39.416581-07	2024-07-10 16:31:39.416581-07
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Comments" (id, "postId", "userId", text, "createdAt", "updatedAt") FROM stdin;
1	1	6	Cool	2024-07-10 09:36:34.538-07	2024-07-10 09:36:34.538-07
2	1	6	Cool	2024-07-10 09:42:24.084-07	2024-07-10 09:42:24.084-07
3	1	6	Cool	2024-07-10 09:42:33.311-07	2024-07-10 09:42:33.311-07
4	1	6	Cool	2024-07-10 09:57:50.22-07	2024-07-10 09:57:50.22-07
5	2	6	Cool!!!	2024-07-10 10:14:48.936-07	2024-07-10 10:14:48.939-07
6	2	6	Nice	2024-07-10 10:26:52.344-07	2024-07-10 10:26:52.344-07
\.


--
-- Data for Name: Forests; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Forests" (id, "adminForestId", region, "forestNumber", "forestOrgCode", name, "gisAcres", "shapeLength", "shapeArea", "createdAt", "updatedAt") FROM stdin;
1	e23b8205-a516-4aa3-945e-5dd93dbfe227	08	60	0860	Land Between the Lakes National Recreation Area	171280.759	\N	\N	2024-07-11 00:51:31.676	2024-07-11 00:51:31.676
2	99277d9a-c8c4-49c4-aced-d7f8e1d8c78a	08	36	0836	Savannah River Site	198068.38	\N	\N	2024-07-11 00:51:31.686	2024-07-11 00:51:31.686
3	99080100010343	08	01	0801	National Forests in Alabama	1289512.639	\N	\N	2024-07-11 00:51:31.687	2024-07-11 00:51:31.687
4	99030200010343	03	02	0302	Carson National Forest	1592472.722	\N	\N	2024-07-11 00:51:31.689	2024-07-11 00:51:31.689
5	99031200010343	03	12	0312	Tonto National Forest	2966417.143	\N	\N	2024-07-11 00:51:31.691	2024-07-11 00:51:31.691
6	99080300010343	08	03	0803	Chattahoochee-Oconee National Forests	1796307.006	\N	\N	2024-07-11 00:51:31.692	2024-07-11 00:51:31.692
7	99060900010343	06	09	0609	Olympic National Forest	697410.589	\N	\N	2024-07-11 00:51:31.693	2024-07-11 00:51:31.693
8	99060500010343	06	05	0605	Mt. Baker-Snoqualmie National Forest	2025562.723	\N	\N	2024-07-11 00:51:31.694	2024-07-11 00:51:31.694
9	99061000010343	06	10	0610	Rogue River-Siskiyou National Forests	1852705.181	\N	\N	2024-07-11 00:51:31.695	2024-07-11 00:51:31.695
10	99051900010343	05	19	0519	Lake Tahoe Basin Management Unit	331807.525	\N	\N	2024-07-11 00:51:31.696	2024-07-11 00:51:31.696
11	99030300010343	03	03	0303	Cibola National Forest	3215659.725	\N	\N	2024-07-11 00:51:31.697	2024-07-11 00:51:31.697
12	99041500010343	04	15	0415	Caribou-Targhee National Forest	3077757.384	\N	\N	2024-07-11 00:51:31.697	2024-07-11 00:51:31.697
13	99021200010343	02	12	0212	Pike and San Isabel National Forests	3968994.484	\N	\N	2024-07-11 00:51:31.698	2024-07-11 00:51:31.698
14	99020900010343	02	09	0209	Rio Grande National Forest	1937280.113	\N	\N	2024-07-11 00:51:31.699	2024-07-11 00:51:31.699
15	99020300010343	02	03	0203	Black Hills National Forest	1537483.213	\N	\N	2024-07-11 00:51:31.699	2024-07-11 00:51:31.699
16	99021300010343	02	13	0213	San Juan National Forest	2094532.779	\N	\N	2024-07-11 00:51:31.7	2024-07-11 00:51:31.7
17	99020200010343	02	02	0202	Bighorn National Forest	1112947.828	\N	\N	2024-07-11 00:51:31.701	2024-07-11 00:51:31.701
18	99020700010343	02	07	0207	Nebraska National Forest	2064856.394	\N	\N	2024-07-11 00:51:31.701	2024-07-11 00:51:31.701
19	99021000010343	02	10	0210	Arapaho and Roosevelt National Forests	2491799.116	\N	\N	2024-07-11 00:51:31.702	2024-07-11 00:51:31.702
20	99021400010343	02	14	0214	Shoshone National Forest	2469224.139	\N	\N	2024-07-11 00:51:31.702	2024-07-11 00:51:31.702
\.


--
-- Data for Name: Itineraries; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Itineraries" (id, "userId", name, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ItineraryItems; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."ItineraryItems" (id, "itineraryId", "forestId", "trailId", "campsiteId", date, "time", note, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Photos; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Photos" (id, "userId", "forestId", "trailId", "campsiteId", url, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Posts" (id, "postType", location, rating, "reviewText", photos, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Reviews" (id, "userId", "forestId", "trailId", "campsiteId", rating, comment, "createdAt", "updatedAt", "postId") FROM stdin;
1	6	\N	\N	\N	3	Cool!	2024-07-09 13:52:06.636-07	2024-07-09 13:52:06.636-07	\N
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240626172606-create-forest.js
20240626172606-create-user.js
20240626172607-create-campsite.js
20240626172607-create-review.js
20240626172607-create-trail.js
20240626172608-create-itinerary-item.js
20240626172608-create-itinerary.js
20240626172608-create-photo.js
20240708153404-add-profile-and-cover-photos-to-users.js
20240708161049-add-profile-and-cover-photos-to-users.js
20240709003134-create-posts.js
20240709160743-add-postId-to-reviews.js
20240709165939-create-comments.js
20240711001512-alter-typical-tread-width-to-string.js
20240711002113-clear-trails-table.js
\.


--
-- Data for Name: Trails; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Trails" (id, "trailId", name, type, "segmentLength", "managingOrg", "accessibilityStatus", "trailSurface", "allowedTerraUse", "allowedSnowUse", "allowedWaterUse", "typicalTrailGrade", "typicalTreadWidth", "createdAt", "updatedAt") FROM stdin;
61	291	DREW CANYON	TERRA	0.535	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.622	2024-07-11 00:34:38.622
62	602C	OSPREY	TERRA	0.375	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.626	2024-07-11 00:34:38.627
63	648	MEADOWVIEW	TERRA	0.212	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.628	2024-07-11 00:34:38.628
64	107C	PINEVIEW CONNECTOR	TERRA	0.23	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.629	2024-07-11 00:34:38.629
65	602G	GROUSE	TERRA	1.2	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.631	2024-07-11 00:34:38.631
66	631B	LOS BURROS SHORTCUT	TERRA	1.85	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.632	2024-07-11 00:34:38.632
67	622	RIM LAKES VISTA	TERRA	2	030102	ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.633	2024-07-11 00:34:38.633
68	415	CHEVELON CROSSING	TERRA	0.6818	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.633	2024-07-11 00:34:38.633
69	413	BOULDER HOP	TERRA	0.8	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.635	2024-07-11 00:34:38.635
70	502	235 ROAD	TERRA	4.2	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.636	2024-07-11 00:34:38.636
71	SNO-519	DARE ME	SNOW	0.7312	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.637	2024-07-11 00:34:38.637
72	SNO-515	WEDDING DAY	SNOW	1.41	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.638	2024-07-11 00:34:38.638
73	27	ROBINSON MESA	TERRA	11.0336	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.638	2024-07-11 00:34:38.638
74	607I	TANK	TERRA	0.58	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.639	2024-07-11 00:34:38.639
75	604	MT BALDY CROSSOVER	TERRA	2.6283	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.639	2024-07-11 00:34:38.639
76	607D	CROSSOVER	TERRA	1.04	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.64	2024-07-11 00:34:38.64
77	SNO-605B	SUNRISE SNOWMOBILE 249	SNOW	8.38	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.641	2024-07-11 00:34:38.641
78	95B	EAST BALDY	TERRA	5.3649	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.641	2024-07-11 00:34:38.641
79	94B	WEST BALDY	TERRA	1.1428	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.642	2024-07-11 00:34:38.642
80	607E	FLAT TOP	TERRA	3.52	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.643	2024-07-11 00:34:38.643
81	18EV412	\N	TERRA	1.769	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.643	2024-07-11 00:34:38.643
82	17EV401	\N	TERRA	1.141	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.644	2024-07-11 00:34:38.644
83	18EV409	\N	TERRA	1.026	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.644	2024-07-11 00:34:38.644
84	18DC485	\N	TERRA	0.058	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.645	2024-07-11 00:34:38.645
85	18EV408	\N	TERRA	0.163	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.646	2024-07-11 00:34:38.646
86	18EV420	\N	TERRA	0.801	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.646	2024-07-11 00:34:38.646
87	18EV432	\N	TERRA	0.63	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.647	2024-07-11 00:34:38.647
88	17DC451	\N	TERRA	0.019	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.647	2024-07-11 00:34:38.647
89	15EV112	\N	TERRA	0.2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.648	2024-07-11 00:34:38.648
90	17EV406	\N	TERRA	0.488	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.648	2024-07-11 00:34:38.648
91	19EV150	\N	TERRA	0.977	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.649	2024-07-11 00:34:38.649
92	19EV214	\N	TERRA	2.765	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.65	2024-07-11 00:34:38.65
93	18EV411	\N	TERRA	0.194	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.65	2024-07-11 00:34:38.65
94	19EV137	\N	TERRA	0.304	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.651	2024-07-11 00:34:38.651
95	18EV448	\N	TERRA	0.107	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.652	2024-07-11 00:34:38.652
96	17DC431	\N	TERRA	0.023	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.652	2024-07-11 00:34:38.652
97	16EV440	\N	TERRA	0.217	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.653	2024-07-11 00:34:38.653
98	18EV422	\N	TERRA	0.244	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.653	2024-07-11 00:34:38.653
99	18EV421	\N	TERRA	1.452	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.654	2024-07-11 00:34:38.654
100	16EV441	\N	TERRA	0.236	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.655	2024-07-11 00:34:38.655
101	19EV215	\N	TERRA	0.6	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.655	2024-07-11 00:34:38.655
102	21E11	STANISLAUS PEAK	TERRA	3.307	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.656	2024-07-11 00:34:38.656
103	17DC497	\N	TERRA	0.036	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.656	2024-07-11 00:34:38.656
104	20E72	GRANITE LAKE	TERRA	2.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.657	2024-07-11 00:34:38.657
105	17EV497	\N	TERRA	0.888	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.657	2024-07-11 00:34:38.657
106	20E14A	POWELL LAKE SPUR	TERRA	0.127	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.658	2024-07-11 00:34:38.658
107	16EV233	TWAIN HARTE OHV-M/C	TERRA	0.09	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.658	2024-07-11 00:34:38.658
108	15EV46	COLUMBIA SE OHV-M/C	TERRA	0.267	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.659	2024-07-11 00:34:38.659
109	20E65	DOUBLE DOME	TERRA	4.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.659	2024-07-11 00:34:38.659
110	15EV26	SUMMIT LEVEL	TERRA	0.322	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.66	2024-07-11 00:34:38.66
111	20E61	SILVER MINE CREEK	TERRA	1.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.66	2024-07-11 00:34:38.66
112	20E78_OBSOLETE	WOODS GULCH / ARNOT CREEK	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.661	2024-07-11 00:34:38.661
113	20E90	WILLOW CREEK / BLOOMER LAKE	TERRA	3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.662	2024-07-11 00:34:38.662
114	16EV247	CRANDALL PK OHV-M/C	TERRA	1.127	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.662	2024-07-11 00:34:38.662
115	20E62	BENNET JUNIPER	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.663	2024-07-11 00:34:38.663
116	20E63_OBSOLETE	RELIEF RESERVOIR	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.663	2024-07-11 00:34:38.663
117	17DC495	\N	TERRA	0.03	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.664	2024-07-11 00:34:38.664
118	16EV236	TWAIN HARTE OHV-M/C	TERRA	0.956	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.664	2024-07-11 00:34:38.664
119	16EV268	CRANDALL PK OHV-M/C	TERRA	0.376	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.665	2024-07-11 00:34:38.665
120	16EV248	TWAIN HARTE OHV-M/C	TERRA	0.928	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.665	2024-07-11 00:34:38.665
121	16EV141	CRANDALL PK OHV-M/C	TERRA	0.866	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.666	2024-07-11 00:34:38.666
122	16EV251	TWAIN HARTE OHV M/C	TERRA	0.32	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.667	2024-07-11 00:34:38.667
123	16EV124	CRANDALL PK 0HV-M/C	TERRA	0.152	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.667	2024-07-11 00:34:38.667
124	16EV106	TWAIN HARTE OHV-M/C	TERRA	1.496	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.668	2024-07-11 00:34:38.668
125	16EV133	CRANDALL PK OHV-ATV	TERRA	0.434	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.668	2024-07-11 00:34:38.668
126	16EV256	CRANDALL PK OHV-ATV	TERRA	0.243	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.669	2024-07-11 00:34:38.669
127	16EV160	CRANDALL PK OHV-M/C	TERRA	1.31	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.669	2024-07-11 00:34:38.669
128	510	ROCK SHELTER	TERRA	0.368	030102	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.67	2024-07-11 00:34:38.67
129	511	SINKHOLE	TERRA	0.6771	030102	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.67	2024-07-11 00:34:38.67
130	512	AL FULTON	TERRA	0.09	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.671	2024-07-11 00:34:38.671
131	612	ROCKY  BLUFF	TERRA	0.578	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.671	2024-07-11 00:34:38.671
132	509	POLIMANA	TERRA	0.178	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.672	2024-07-11 00:34:38.672
133	521	BACK ALLEY	TERRA	2.24	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.673	2024-07-11 00:34:38.673
134	414	CARR CONNECTOR	TERRA	0.3	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.673	2024-07-11 00:34:38.673
135	507	RIM CAMPGROUND	TERRA	0.2	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.674	2024-07-11 00:34:38.674
136	533	PASTURE	TERRA	1.3	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.674	2024-07-11 00:34:38.674
137	SNO-521	BACK ALLEY	SNOW	2.289	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.675	2024-07-11 00:34:38.675
138	179	MILITARY SINKHOLE	TERRA	0.4	030102	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.675	2024-07-11 00:34:38.675
139	535	WILLOW SPRINGS BIKE LOOP	TERRA	7.9	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.676	2024-07-11 00:34:38.676
140	500	HANGMAN	TERRA	1.312	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.676	2024-07-11 00:34:38.676
141	SNO-518	MELLOW	SNOW	0.4366	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.676	2024-07-11 00:34:38.676
142	508	COTTONWOOD	TERRA	7.02	030102	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.677	2024-07-11 00:34:38.677
143	501	FISHERMAN	TERRA	0.382	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.678	2024-07-11 00:34:38.678
144	95A	EAST FORK	TERRA	7.65	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.678	2024-07-11 00:34:38.678
145	505	MEADOW	TERRA	1.4	030102	ACCESSIBLE	AC- ASPHALT	N/A	N/A	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.679	2024-07-11 00:34:38.679
146	107A	BILLY CREEK CONNECTOR	TERRA	0.03	030107	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.679	2024-07-11 00:34:38.679
147	640B	JUNIPER RIDGE SHORTCUT	TERRA	1.1	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.68	2024-07-11 00:34:38.68
148	17EV303	HULL CREEK OHV	TERRA	0.827	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.68	2024-07-11 00:34:38.68
149	17EV293	HULL CREEK OHV	TERRA	0.787	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.68	2024-07-11 00:34:38.68
150	17EV290	HULL CREEK OHV	TERRA	0.4	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.681	2024-07-11 00:34:38.681
151	16EV304	CRANDALL PEAK OHV	TERRA	0.086	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.682	2024-07-11 00:34:38.682
152	17EV281	STRAWBERRY OHV	TERRA	0.272	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.682	2024-07-11 00:34:38.682
153	19DC149	\N	TERRA	0.284	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.682	2024-07-11 00:34:38.682
154	18DC450	\N	TERRA	0.033	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.683	2024-07-11 00:34:38.683
155	19DC158	\N	TERRA	0.128	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.683	2024-07-11 00:34:38.683
156	19DC159	\N	TERRA	0.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.684	2024-07-11 00:34:38.684
157	17EV283	STRAWBERRY OHV	TERRA	0.206	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.684	2024-07-11 00:34:38.684
158	19DC122	\N	TERRA	0.089	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.685	2024-07-11 00:34:38.685
159	19DC113	\N	TERRA	0.099	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.685	2024-07-11 00:34:38.685
160	18DC431	\N	TERRA	0.085	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.686	2024-07-11 00:34:38.686
161	19DC121	\N	TERRA	0.042	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.686	2024-07-11 00:34:38.686
162	19DC119	\N	TERRA	0.087	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.687	2024-07-11 00:34:38.687
163	17DC428	\N	TERRA	0.136	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.687	2024-07-11 00:34:38.687
164	18DC416	\N	TERRA	0.082	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.688	2024-07-11 00:34:38.688
165	18DC430	\N	TERRA	0.031	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.688	2024-07-11 00:34:38.688
166	18DC418	\N	TERRA	0.033	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.689	2024-07-11 00:34:38.689
167	19DC124	\N	TERRA	0.125	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.689	2024-07-11 00:34:38.689
168	18DC429	\N	TERRA	0.078	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.69	2024-07-11 00:34:38.69
169	18DC423	\N	TERRA	0.192	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.69	2024-07-11 00:34:38.69
170	19DC128	\N	TERRA	0.015	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.69	2024-07-11 00:34:38.69
171	18DC403	\N	TERRA	0.106	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.691	2024-07-11 00:34:38.691
172	19DC147	\N	TERRA	0.05	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.691	2024-07-11 00:34:38.691
173	19DC134	\N	TERRA	0.087	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.692	2024-07-11 00:34:38.692
174	19DC160	\N	TERRA	0.094	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.692	2024-07-11 00:34:38.692
175	18DC434	\N	TERRA	0.04	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.693	2024-07-11 00:34:38.693
176	19DC118	\N	TERRA	0.058	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.693	2024-07-11 00:34:38.693
177	20DC202	\N	TERRA	0.02	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.693	2024-07-11 00:34:38.693
178	19DC116	\N	TERRA	0.03	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.694	2024-07-11 00:34:38.694
179	19DC156	\N	TERRA	0.028	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.694	2024-07-11 00:34:38.694
180	18DC428	\N	TERRA	0.066	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.695	2024-07-11 00:34:38.695
181	19DC120	\N	TERRA	0.144	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.695	2024-07-11 00:34:38.695
182	19DC108	\N	TERRA	0.032	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.696	2024-07-11 00:34:38.696
183	19DC146	\N	TERRA	0.032	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.696	2024-07-11 00:34:38.696
184	18DC436	\N	TERRA	0.044	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.697	2024-07-11 00:34:38.697
185	18DC417	\N	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.697	2024-07-11 00:34:38.697
186	18DC426	\N	TERRA	0.028	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.698	2024-07-11 00:34:38.698
187	17DC423	\N	TERRA	0.169	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.698	2024-07-11 00:34:38.698
188	18DC442	\N	TERRA	0.09	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.699	2024-07-11 00:34:38.699
189	16DC423	\N	TERRA	0.044	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.699	2024-07-11 00:34:38.699
190	17DC435	\N	TERRA	0.068	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.699	2024-07-11 00:34:38.699
191	18DC441	\N	TERRA	0.083	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.7	2024-07-11 00:34:38.7
192	17DC480	\N	TERRA	0.037	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.7	2024-07-11 00:34:38.7
193	16DC427	\N	TERRA	0.054	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.701	2024-07-11 00:34:38.701
194	19DC102	\N	TERRA	0.062	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.701	2024-07-11 00:34:38.701
195	17DC422	\N	TERRA	0.104	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.701	2024-07-11 00:34:38.701
196	17DC433	\N	TERRA	0.054	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.702	2024-07-11 00:34:38.702
197	19DC105	\N	TERRA	0.044	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.702	2024-07-11 00:34:38.702
198	19DC106	\N	TERRA	0.059	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.703	2024-07-11 00:34:38.703
199	17DC419	\N	TERRA	0.043	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.703	2024-07-11 00:34:38.703
200	17DC491	\N	TERRA	0.072	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.704	2024-07-11 00:34:38.704
201	16DC439	\N	TERRA	0.107	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.704	2024-07-11 00:34:38.704
202	16DC424	\N	TERRA	0.053	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.704	2024-07-11 00:34:38.704
203	19DC100	\N	TERRA	0.07	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.705	2024-07-11 00:34:38.705
204	16DC422	\N	TERRA	0.049	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.705	2024-07-11 00:34:38.705
205	17DC434	\N	TERRA	0.032	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.706	2024-07-11 00:34:38.706
206	17DC420	\N	TERRA	0.082	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.706	2024-07-11 00:34:38.706
207	16DC420	\N	TERRA	0.055	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.707	2024-07-11 00:34:38.707
208	18E85	ASPEN MEADOW	TERRA	4.509	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.707	2024-07-11 00:34:38.707
209	19E15	HELLS MOUNTAIN	TERRA	5.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.707	2024-07-11 00:34:38.707
210	19EV94	\N	TERRA	0.12	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.708	2024-07-11 00:34:38.708
211	16E25	GROUSE VALLEY	TERRA	3.45	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.708	2024-07-11 00:34:38.708
212	17E18	PAKER POT. 4X4	TERRA	1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.709	2024-07-11 00:34:38.709
213	19E07	HERRING CREEK	TERRA	6.116	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.709	2024-07-11 00:34:38.709
214	19E28	BOX SPRING/CHAIN LAKES	TERRA	1.363	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.709	2024-07-11 00:34:38.709
215	18E06	TWIN MEADOWS	TERRA	0.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.71	2024-07-11 00:34:38.71
216	19E95	BOX SPRING	TERRA	3.8	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.71	2024-07-11 00:34:38.71
217	17E16	BLUE HOLE/MATTLEY	TERRA	4.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.71	2024-07-11 00:34:38.71
218	18E99	EAST HERRING CREEK	TERRA	0.494	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.711	2024-07-11 00:34:38.711
219	19E13	GROUSE / CHAIN LAKES	TERRA	0.8	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.711	2024-07-11 00:34:38.711
220	18E83	SHADOW OF THE MIWOK INTERPERAT	TERRA	0.232	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.712	2024-07-11 00:34:38.712
221	602H	VIEWPOINT	TERRA	1.371	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.712	2024-07-11 00:34:38.712
222	331E	SPRUCE	TERRA	0.5	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.712	2024-07-11 00:34:38.712
223	602D	RED TAIL	TERRA	0.3425	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.713	2024-07-11 00:34:38.713
224	602A	MEADOW LARK	TERRA	2.1	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.713	2024-07-11 00:34:38.713
225	646	TURKEY TRACK	TERRA	1.4199	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.713	2024-07-11 00:34:38.713
226	331D	WILLOW	TERRA	1.4	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.714	2024-07-11 00:34:38.714
227	631A	CHIPMUNK SPRINGS	TERRA	6.97	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.714	2024-07-11 00:34:38.714
228	602B	RAVEN	TERRA	1	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.715	2024-07-11 00:34:38.715
229	SNO-513	RIM RUN	SNOW	2.9605	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.715	2024-07-11 00:34:38.715
230	529	ROSS DRAW	TERRA	1.7	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.716	2024-07-11 00:34:38.716
231	SNO-516	FEELIN' BLUE	SNOW	1.777	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.716	2024-07-11 00:34:38.716
232	524	THE MAZE	TERRA	0.885	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.717	2024-07-11 00:34:38.717
233	523	SECTION LINE	TERRA	0.92	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.717	2024-07-11 00:34:38.717
234	613	THREE OAKS	TERRA	0.401	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.718	2024-07-11 00:34:38.718
235	SNO-410	PROMONTORY SNOWMOBILE LOOP	SNOW	4.6	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.718	2024-07-11 00:34:38.718
236	602F	OWL	TERRA	0.3504	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.718	2024-07-11 00:34:38.718
237	292	HORTON SPRINGS	TERRA	0.3	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.719	2024-07-11 00:34:38.719
238	602I	ELK	TERRA	1.4	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.719	2024-07-11 00:34:38.719
239	610A	BIG SPRINGS CONNECTOR	TERRA	0.1	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.72	2024-07-11 00:34:38.72
240	184	SEE CANYON	TERRA	0.16	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.72	2024-07-11 00:34:38.72
241	602J	SUMMIT	TERRA	2.1	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.72	2024-07-11 00:34:38.72
242	646B	PINECREST	TERRA	0.0641	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.721	2024-07-11 00:34:38.721
243	17DC421	\N	TERRA	0.092	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.721	2024-07-11 00:34:38.721
244	16DC415	\N	TERRA	0.079	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.721	2024-07-11 00:34:38.721
245	15DC102	\N	TERRA	0.044	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.722	2024-07-11 00:34:38.722
246	17DC436	\N	TERRA	0.08	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.722	2024-07-11 00:34:38.722
247	16DC421	\N	TERRA	0.203	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.722	2024-07-11 00:34:38.722
248	16DC410	\N	TERRA	0.101	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.723	2024-07-11 00:34:38.723
249	16DC431	\N	TERRA	0.042	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.723	2024-07-11 00:34:38.723
250	17DC437	\N	TERRA	0.047	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.724	2024-07-11 00:34:38.724
251	19DC101	\N	TERRA	0.042	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.724	2024-07-11 00:34:38.724
252	17DC430	\N	TERRA	0.075	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.724	2024-07-11 00:34:38.724
253	18DC460	\N	TERRA	0.022	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.725	2024-07-11 00:34:38.725
254	16DC417	\N	TERRA	0.033	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.725	2024-07-11 00:34:38.725
255	16DC408	\N	TERRA	0.046	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.726	2024-07-11 00:34:38.726
256	17DC452	\N	TERRA	0.061	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.726	2024-07-11 00:34:38.726
257	16DC428	\N	TERRA	0.082	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.727	2024-07-11 00:34:38.727
258	18DC457	\N	TERRA	0.051	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.727	2024-07-11 00:34:38.727
259	17DC447	\N	TERRA	0.037	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.727	2024-07-11 00:34:38.727
260	15DC100	\N	TERRA	0.038	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.728	2024-07-11 00:34:38.728
261	17DC462	\N	TERRA	0.036	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.728	2024-07-11 00:34:38.728
262	18DC443	\N	TERRA	0.064	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.729	2024-07-11 00:34:38.729
263	17DC493	\N	TERRA	0.052	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.729	2024-07-11 00:34:38.729
264	17DC482	\N	TERRA	0.137	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.73	2024-07-11 00:34:38.73
265	17DC403	\N	TERRA	0.06	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.73	2024-07-11 00:34:38.73
266	17DC449	\N	TERRA	0.037	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.73	2024-07-11 00:34:38.73
267	16DC409	\N	TERRA	0.014	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.731	2024-07-11 00:34:38.731
268	17DC429	\N	TERRA	0.119	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.731	2024-07-11 00:34:38.731
269	17DC448	\N	TERRA	0.035	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.732	2024-07-11 00:34:38.732
270	16DC414	\N	TERRA	0.029	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.732	2024-07-11 00:34:38.732
271	16DC426	\N	TERRA	0.057	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.732	2024-07-11 00:34:38.732
272	18DC401	\N	TERRA	0.074	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.733	2024-07-11 00:34:38.733
273	19DC104	\N	TERRA	0.056	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.733	2024-07-11 00:34:38.733
274	16DC402	\N	TERRA	0.035	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.733	2024-07-11 00:34:38.733
275	18DC456	\N	TERRA	0.024	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.734	2024-07-11 00:34:38.734
276	16DC413	\N	TERRA	0.056	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.734	2024-07-11 00:34:38.734
277	19DC210	\N	TERRA	0.05	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.734	2024-07-11 00:34:38.734
278	17DC492	\N	TERRA	0.116	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.735	2024-07-11 00:34:38.735
279	17DC453	\N	TERRA	0.051	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.735	2024-07-11 00:34:38.735
280	15DC101	\N	TERRA	0.072	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.736	2024-07-11 00:34:38.736
281	20DC227	\N	TERRA	0.073	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.736	2024-07-11 00:34:38.736
282	19DC103	\N	TERRA	0.06	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.737	2024-07-11 00:34:38.737
283	18EV410	\N	TERRA	0.29	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.737	2024-07-11 00:34:38.737
284	18EV400	\N	TERRA	0.571	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.737	2024-07-11 00:34:38.737
285	19EV155	\N	TERRA	1.109	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.738	2024-07-11 00:34:38.738
286	18EV407	\N	TERRA	0.495	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.738	2024-07-11 00:34:38.738
287	19EV148	\N	TERRA	0.443	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.739	2024-07-11 00:34:38.739
288	19EV139	\N	TERRA	0.13	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.739	2024-07-11 00:34:38.739
289	18EV415	\N	TERRA	0.202	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.739	2024-07-11 00:34:38.739
290	17EV411	\N	TERRA	0.352	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.74	2024-07-11 00:34:38.74
291	16DC412	\N	TERRA	0.038	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.74	2024-07-11 00:34:38.74
292	19EV144	\N	TERRA	1.0105	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.74	2024-07-11 00:34:38.74
293	18EV444	\N	TERRA	1.8606	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.741	2024-07-11 00:34:38.741
294	16EV405	\N	TERRA	0.285	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.741	2024-07-11 00:34:38.741
295	18EV419	\N	TERRA	0.803	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.741	2024-07-11 00:34:38.741
296	18EV405	\N	TERRA	0.72	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.742	2024-07-11 00:34:38.742
297	18E10	PINECREST LAKE N.R.T.	TERRA	3.818	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.742	2024-07-11 00:34:38.742
298	19E14A	CLEAR LAKE	TERRA	1.233	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.742	2024-07-11 00:34:38.742
299	17E51	SKULL POT. 4X4	TERRA	8	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.743	2024-07-11 00:34:38.743
300	18E84	TRAIL OF THE GARGOYLES INTERPE	TERRA	0.6	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.743	2024-07-11 00:34:38.743
301	19E08	WILLOW MEADOW	TERRA	0.682	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.744	2024-07-11 00:34:38.744
302	19E32	SOUTH FORK STANISLAUS	TERRA	2	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.744	2024-07-11 00:34:38.744
303	19E14	BELL CREEK	TERRA	2	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.744	2024-07-11 00:34:38.744
304	18E55	CASCADE CREEK	TERRA	4.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.745	2024-07-11 00:34:38.745
305	18E09	PINECREST PEAK/CATFISH LAKE	TERRA	4.438	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.745	2024-07-11 00:34:38.745
306	18E10A	CLEOS BATH	TERRA	0.759	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.746	2024-07-11 00:34:38.746
307	19E49	MCCORMICK / DREW CREEK	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.746	2024-07-11 00:34:38.746
308	20E28	PINGREE LAKE	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.746	2024-07-11 00:34:38.746
309	20E54	LIGHTNING MOUNTAIN	TERRA	5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.747	2024-07-11 00:34:38.747
310	19E52	BULL RUN ROCK	TERRA	1.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.747	2024-07-11 00:34:38.747
311	19E52B	NEAR PIKES PEAK	TERRA	0.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.748	2024-07-11 00:34:38.748
312	20E43	COOPER POCKET	TERRA	3.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.748	2024-07-11 00:34:38.748
313	20E39	BLACK HAWK LAKE	TERRA	5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.749	2024-07-11 00:34:38.749
314	20E09_OBSOLETE	SUMMIT CREEK	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.749	2024-07-11 00:34:38.749
315	20E55	LIGHTNING MOUNTAIN / ARNOT	TERRA	1.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.75	2024-07-11 00:34:38.75
316	20E46	LETORA LAKE	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.75	2024-07-11 00:34:38.75
317	20E38	SPRING CREEK	TERRA	3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.75	2024-07-11 00:34:38.75
318	20E58	CLARK FORK CAMPGROUND	TERRA	0.542	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.751	2024-07-11 00:34:38.751
319	20E11A	BOUNDRY LAKE ( SPUR )	TERRA	0.475	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.751	2024-07-11 00:34:38.751
320	20E37	LONG LAKE	TERRA	0.8	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.752	2024-07-11 00:34:38.752
321	20E25	PRUITT LAKE	TERRA	2.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.752	2024-07-11 00:34:38.752
322	20E52	DISASTER / PARIDISE	TERRA	1.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.753	2024-07-11 00:34:38.753
323	20E40	TOMS CANYON	TERRA	4	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.753	2024-07-11 00:34:38.753
324	20E59	BOULDER FLAT	TERRA	8.8	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.754	2024-07-11 00:34:38.754
325	20E19	WOOD / DEER LAKES	TERRA	1.194	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.754	2024-07-11 00:34:38.754
326	19E91	LAKE VALLEY / S.FORK STANISLAU	TERRA	2	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.755	2024-07-11 00:34:38.755
327	20E45	BIG LAKE	TERRA	2	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.755	2024-07-11 00:34:38.755
328	20E44_OBSOLETE	RELIEF / SAUCER MEADOW	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.755	2024-07-11 00:34:38.755
329	20E36	LONG LAKE	TERRA	1.077	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.756	2024-07-11 00:34:38.756
330	20E57	STANISLAUS RIVER / CAMP LIAHON	TERRA	16.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.756	2024-07-11 00:34:38.756
331	20E58A	BALD PEAK	TERRA	0.8	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.756	2024-07-11 00:34:38.756
332	20E60_OBSOLETE	KENNEDY MEADOWS / RELIEF RESER	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.757	2024-07-11 00:34:38.757
333	20E56	LIGHTNING MOUNTAIN	TERRA	4.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.757	2024-07-11 00:34:38.757
334	19E51	BARN MEADOW	TERRA	1.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.758	2024-07-11 00:34:38.758
335	18E38	BOURLAND CREEK	TERRA	2.808	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.758	2024-07-11 00:34:38.758
336	20E31	HAY MEADOW / 19E91	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.758	2024-07-11 00:34:38.758
337	20E29	HYATT LAKE	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.759	2024-07-11 00:34:38.759
338	17DC499	\N	TERRA	0.28	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.759	2024-07-11 00:34:38.759
339	21E14_OBSOLETE	HORSE MEADOW / CHERRY CREEK	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.759	2024-07-11 00:34:38.759
340	16E27B	\N	TERRA	0.191	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.759	2024-07-11 00:34:38.759
341	20E74	LONG VALLEY CREEK	TERRA	3.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.76	2024-07-11 00:34:38.76
342	17DC498	\N	TERRA	0.039	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.76	2024-07-11 00:34:38.76
343	20E87_OBSOLETE	PEACEFUL PINES / DISASTER	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.761	2024-07-11 00:34:38.761
344	16EV237	TWAIN HARTE OHV-ATV	TERRA	0.086	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.761	2024-07-11 00:34:38.761
345	17E17	CALAVERAS DN OHV ATV RT7E	TERRA	1.677	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.761	2024-07-11 00:34:38.761
346	20E94_OBSOLETE	NORTH FORK CHERRY CREEK	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.762	2024-07-11 00:34:38.762
347	17DC494	\N	TERRA	0.065	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.762	2024-07-11 00:34:38.762
348	20E75	BENNET JUNIPER	TERRA	4	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.762	2024-07-11 00:34:38.762
349	16EV269	TWAIN HARTE OHV-M/C	TERRA	0.223	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.763	2024-07-11 00:34:38.763
350	16EV244	CRANDALL PK OHV-M/C	TERRA	0.487	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.763	2024-07-11 00:34:38.763
351	411	ASPEN	TERRA	5.51	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.763	2024-07-11 00:34:38.763
352	602E	PINE J	TERRA	1.68	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.764	2024-07-11 00:34:38.764
353	602	POLE KNOLL	TERRA	6.2	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.764	2024-07-11 00:34:38.764
354	107B	SPRINGS CONNECTOR	TERRA	0.03	030107	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.765	2024-07-11 00:34:38.765
355	646A	TURKEY TRACK ROAD	TERRA	0.0743	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.765	2024-07-11 00:34:38.765
356	17EV88	HULL CREEK OHV - ATV	TERRA	1.524	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.765	2024-07-11 00:34:38.765
357	18EV134	HULL CREEK/STRAWBERRY OHV- ATV	TERRA	3.19	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.766	2024-07-11 00:34:38.766
358	14E10	ART BRANCH	TERRA	0.111	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.766	2024-07-11 00:34:38.766
359	18E87A	ALPINE HORSE TRAIL ALT ROUTE	TERRA	0.08	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.766	2024-07-11 00:34:38.766
360	20DC238	\N	TERRA	0.122	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.767	2024-07-11 00:34:38.767
361	17EV78	HULL CREEK OHV	TERRA	0.297	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.767	2024-07-11 00:34:38.767
362	17EV58	HULL CREEK OHV- 4X4	TERRA	1.693	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.767	2024-07-11 00:34:38.767
363	20DC234	\N	TERRA	0.079	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.768	2024-07-11 00:34:38.768
364	18EV258	HULL CREEK OHV - ATV	TERRA	0.616	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.768	2024-07-11 00:34:38.768
365	17EV60	HULL CREEK OHV - 4X4	TERRA	0.54	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.768	2024-07-11 00:34:38.768
366	18E171	LK ALPINE CG TO CHICKAREE	TERRA	0.932	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.768	2024-07-11 00:34:38.768
367	20DC236	\N	TERRA	0.081	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.769	2024-07-11 00:34:38.769
368	17EV67	HULL CREEK OHV- ATV	TERRA	0.3154	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.769	2024-07-11 00:34:38.769
369	19E30A	DONNELL VISTA2	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.769	2024-07-11 00:34:38.769
370	17EV53	HULL CREEK OHV-4X4	TERRA	2.969	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.77	2024-07-11 00:34:38.77
371	20EV230	\N	TERRA	0.371	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.77	2024-07-11 00:34:38.77
372	20EV231	\N	TERRA	0.393	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.771	2024-07-11 00:34:38.771
373	10	SARDINE	TERRA	1.83	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.771	2024-07-11 00:34:38.771
374	34	SQUIRREL CANYON	TERRA	1.7572	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.772	2024-07-11 00:34:38.772
375	632B	PAT MULLEN MOUNTAIN CONNECTOR	TERRA	0.54	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.772	2024-07-11 00:34:38.772
376	341	YAM CANYON TRAIL	TERRA	2.69	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.772	2024-07-11 00:34:38.772
377	337	SMOKEY TRAIL	TERRA	3.83	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.773	2024-07-11 00:34:38.773
378	513	RIM RUN	TERRA	2.9065	030102	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.773	2024-07-11 00:34:38.773
379	SNO-331C	ASPEN	SNOW	1.371	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.773	2024-07-11 00:34:38.773
380	14E02	ARNOLD RIM TRAIL - ADA	TERRA	0.866	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.774	2024-07-11 00:34:38.774
381	20EV79	\N	TERRA	2.235	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.774	2024-07-11 00:34:38.774
382	20DC235	\N	TERRA	0.096	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.774	2024-07-11 00:34:38.774
383	18EV77	HULL CREEK OHV - ATV	TERRA	1.536	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.775	2024-07-11 00:34:38.775
384	17EV54	HULL CREEK OHV- ATV	TERRA	0.496	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.775	2024-07-11 00:34:38.775
385	18EV110	HULL CREEK OHV - M/C	TERRA	1.332	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.775	2024-07-11 00:34:38.775
386	20DC233	\N	TERRA	0.097	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.776	2024-07-11 00:34:38.776
387	18E24A	HWY 4 TO 19E01	TERRA	0.856	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.776	2024-07-11 00:34:38.776
388	20DC237	\N	TERRA	0.078	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.776	2024-07-11 00:34:38.776
389	17E63A	L.G.C.F ( SPUR)	TERRA	0.268	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.777	2024-07-11 00:34:38.777
390	17E08	JAWBONE RIDGE	TERRA	5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.777	2024-07-11 00:34:38.777
391	18E68	TEXAS HILL MINE	TERRA	1.95	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.777	2024-07-11 00:34:38.777
392	19E16	COUNTY LINE	TERRA	1.819	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.778	2024-07-11 00:34:38.778
393	19E62	MOSS CREEK	TERRA	5.747	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.778	2024-07-11 00:34:38.778
394	19E36	WEST SHORE CHERRY LAKE	TERRA	4.3	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.778	2024-07-11 00:34:38.778
395	17E63	L.G.C.F. INTERPERATIVE TRAIL	TERRA	1.538	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.779	2024-07-11 00:34:38.779
396	18E65	WOODS RIDGE LOOKOUT	TERRA	0.98	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.779	2024-07-11 00:34:38.779
397	18E64	JAWBONE CREEK	TERRA	2	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.779	2024-07-11 00:34:38.779
398	18EV90	HULL CREEK OHV - ATV	TERRA	0.5743	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.78	2024-07-11 00:34:38.78
399	18E98A	TEXAS HILL	TERRA	2.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.78	2024-07-11 00:34:38.78
400	18E81	RAINBOW POOL	TERRA	0.3	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.78	2024-07-11 00:34:38.78
401	17E64	L.G.C.F. FALLS INTERPERATIVE T	TERRA	0.116	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.781	2024-07-11 00:34:38.781
402	17E43	RED CLOUD	TERRA	3.3	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.781	2024-07-11 00:34:38.781
403	17E46	JORDAN FLAT	TERRA	0.948	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.781	2024-07-11 00:34:38.781
404	18E98	TEXAS HILL	TERRA	2.27	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.782	2024-07-11 00:34:38.782
405	18E61	SOUTH FORK TUOLUMNE RIVER	TERRA	3.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.782	2024-07-11 00:34:38.782
406	19E59	SPUR FROM 19E58	TERRA	0.92	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.782	2024-07-11 00:34:38.782
407	19E56	WHITE FIR CREEK	TERRA	0.263	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.783	2024-07-11 00:34:38.783
408	17E42	SMITH PEAK	TERRA	1.881	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.783	2024-07-11 00:34:38.783
409	18EV91	HULL CREEK OHV - 4X4	TERRA	0.329	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.783	2024-07-11 00:34:38.783
410	18E75	RAILROAD, SOUTH FORK TUOLUMNE	TERRA	1.558	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.784	2024-07-11 00:34:38.784
411	19E17A	YOSEMITE BORDER	TERRA	1.625	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.784	2024-07-11 00:34:38.784
412	17E44	BONDURANT	TERRA	0.43	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.785	2024-07-11 00:34:38.785
413	17E64A	L.G.C.F FALLS ( SPUR )	TERRA	0.047	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.785	2024-07-11 00:34:38.785
414	18E66	CLAVEY RIVER	TERRA	11.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.785	2024-07-11 00:34:38.785
415	18E14	PILOT RIDGE	TERRA	0.4	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.786	2024-07-11 00:34:38.786
416	19E17	NORTH MOUNTAIN LOOKOUT	TERRA	2.635	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.786	2024-07-11 00:34:38.786
417	19E58	MATHER	TERRA	1.309	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.786	2024-07-11 00:34:38.786
418	18EV88	HULL CREEK OHV - ATV	TERRA	1.3227	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.787	2024-07-11 00:34:38.787
419	16E26	LIVING FOREST NATURE TRAIL	TERRA	0.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.787	2024-07-11 00:34:38.787
420	19E69	DIAMOND O	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.787	2024-07-11 00:34:38.787
421	15E14	ACCESS S. FORK MOKELUMNE	TERRA	1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.787	2024-07-11 00:34:38.787
422	16E14	STANISLAUS RIVER ACCESS 5N07.4	TERRA	1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.788	2024-07-11 00:34:38.788
423	19E72	TAWONGA CAMP	TERRA	7.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.788	2024-07-11 00:34:38.788
424	19E67	DIAMOND O	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.788	2024-07-11 00:34:38.788
425	17E03	PRATHER	TERRA	1.3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.789	2024-07-11 00:34:38.789
426	17E02	MCTC: 7N58 TO 7N19Y	TERRA	0.873	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.789	2024-07-11 00:34:38.789
427	19E63	ADJACENT TO ROAD 1S25.4	TERRA	0.244	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.79	2024-07-11 00:34:38.79
428	19E70	MIDDLE FORK CAMPGROUND	TERRA	0.821	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.79	2024-07-11 00:34:38.79
429	19E78	ITALIAN DIGGIN	TERRA	1.356	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.79	2024-07-11 00:34:38.79
430	17DC450	\N	TERRA	0.07	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.79	2024-07-11 00:34:38.79
431	16E10	GARNET HILL TO CUNEO CAMP	TERRA	6	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.791	2024-07-11 00:34:38.791
432	16E15	BORDER CALAVERAS / TUOLOUMNE C	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.791	2024-07-11 00:34:38.791
433	19E76	CARLON CAMPGROUND	TERRA	0.148	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.791	2024-07-11 00:34:38.791
434	15E15	CANDY ROCK	TERRA	0.122	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.792	2024-07-11 00:34:38.792
435	15E01	NORTH FORK STANISLAUS	TERRA	9	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.792	2024-07-11 00:34:38.792
436	16E02	WALKER TO16E20	TERRA	4.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.792	2024-07-11 00:34:38.792
437	18E43	SPICER AREA / SPICER / SAND	TERRA	6.3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.793	2024-07-11 00:34:38.793
438	18E15	MT. REBA SKI AREA	TERRA	4	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.793	2024-07-11 00:34:38.793
439	20E27	HIRAM PK. TO HIGHLAND LAKES	TERRA	1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.793	2024-07-11 00:34:38.793
440	18E44	U.S.A. CAMP / SPICER RESERVOIR	TERRA	6	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.794	2024-07-11 00:34:38.794
441	17E29	CABBAGE PATCH	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.794	2024-07-11 00:34:38.794
442	20E02	WOLF CREEK	TERRA	1.79	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.794	2024-07-11 00:34:38.794
443	20E22	HIRAM PEAK	TERRA	2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.795	2024-07-11 00:34:38.795
444	18E03_OBSOLETE	WHEELER LAKE BYPASS	TERRA	0.1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.795	2024-07-11 00:34:38.795
445	17E60	COW CAMP	TERRA	1.3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.795	2024-07-11 00:34:38.795
446	19E66	DIAMOND O	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.796	2024-07-11 00:34:38.796
447	19E68	DIAMOND O	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.796	2024-07-11 00:34:38.796
448	19E89	LITTLE GRIZZLEY CREEK	TERRA	2.201	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.796	2024-07-11 00:34:38.796
449	17E05	LITTLE RATTLESNAKE	TERRA	4	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.797	2024-07-11 00:34:38.797
450	16E16	BIG TREES	TERRA	2.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.797	2024-07-11 00:34:38.797
451	19E74	CARLON STATION	TERRA	3.603	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.797	2024-07-11 00:34:38.797
452	19E64	ADJACENT TO ROAD 1S25.4	TERRA	1.174	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.798	2024-07-11 00:34:38.798
453	19E71	DIAMOND O	TERRA	0.1	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.798	2024-07-11 00:34:38.798
454	20E70	LITTLE CRANE CREEK	TERRA	2.358	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.799	2024-07-11 00:34:38.799
455	15E07	MANUEL MILL	TERRA	6	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.799	2024-07-11 00:34:38.799
456	17E31	CABBAGE PATCH TO 6N45J	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.799	2024-07-11 00:34:38.799
457	19E94A	HEISER LAKE EXT.	TERRA	0.454	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.8	2024-07-11 00:34:38.8
458	18E87	ALPINE HORSE TRAIL LOOP	TERRA	1.3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.8	2024-07-11 00:34:38.8
459	17E61	A.T.&T.	TERRA	0.953	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.8	2024-07-11 00:34:38.8
460	17E27	BEAR TRAP BASIN	TERRA	0.768	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.801	2024-07-11 00:34:38.801
461	18E07A	FROG LAKE	TERRA	0.8	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.801	2024-07-11 00:34:38.801
462	20E04B	CHAMPION CANYON	TERRA	2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.801	2024-07-11 00:34:38.801
463	18E86	CAPE HORN TO EMIGRANT	TERRA	0.128	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.802	2024-07-11 00:34:38.802
464	17E30	NORTH FORK STANISLAUS	TERRA	2.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.802	2024-07-11 00:34:38.802
465	18E80	LODGEPOLE	TERRA	0.624	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.803	2024-07-11 00:34:38.803
466	18E48	BUMMER / POST CORRAL	TERRA	2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.803	2024-07-11 00:34:38.803
467	17E49	SANDS MEADOW	TERRA	0.531	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.804	2024-07-11 00:34:38.804
468	17E59	HELLS KITCHEN LOOP	TERRA	0.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.804	2024-07-11 00:34:38.804
469	17E20	HWY.4 TO 7N11A	TERRA	2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.805	2024-07-11 00:34:38.805
470	18E01_OBSOLETE	ALPINE BYPASS	TERRA	0.1	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.805	2024-07-11 00:34:38.805
471	19E03	DEER CREEK	TERRA	1.851	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.805	2024-07-11 00:34:38.805
472	19E98	FROM 19E43 TO 19E02	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.806	2024-07-11 00:34:38.806
473	19E22	BULL RUN	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.806	2024-07-11 00:34:38.806
474	17E32	WHITTLE UPPER CAMP	TERRA	0.8	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.806	2024-07-11 00:34:38.806
475	18E26	HIRAM MEADOW TO 19E43	TERRA	0.8	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.807	2024-07-11 00:34:38.807
476	19E11	HIRAM CANYON	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.807	2024-07-11 00:34:38.807
477	16E182	COTTONWOOD CR.	TERRA	0.451	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.807	2024-07-11 00:34:38.807
478	15E09	KNIGHT CREEK	TERRA	3.59	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.808	2024-07-11 00:34:38.808
479	17E23	RUSHING MEADOW	TERRA	0.752	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.808	2024-07-11 00:34:38.808
480	18E317	PAPER CABIN TO TUOLUMNE RIVER	TERRA	1.793	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.808	2024-07-11 00:34:38.808
481	20E50	NORTH FORK MOKELUMNE RIVER	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.809	2024-07-11 00:34:38.809
482	17E06	MAIL ROAD / WOLFIN MEADOW	TERRA	5.786	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.809	2024-07-11 00:34:38.809
483	17E22	CIRCLE	TERRA	0.877	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.809	2024-07-11 00:34:38.809
484	16E180	HUNTER CR. OVERLOOK	TERRA	1.069	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.81	2024-07-11 00:34:38.81
485	16E09	KELTZ MINE	TERRA	0.29	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.81	2024-07-11 00:34:38.81
486	16E07	SONNET MINE	TERRA	1.104	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.81	2024-07-11 00:34:38.81
487	17E35	THIRTEN MILE CREEK	TERRA	1	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.81	2024-07-11 00:34:38.81
488	17E145	CAMP IDA SPRING	TERRA	0.3	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.811	2024-07-11 00:34:38.811
489	17E34	THOMAS PEAK	TERRA	1.7	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.811	2024-07-11 00:34:38.811
490	20E86	JACK ASS CAMP	TERRA	0.3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.812	2024-07-11 00:34:38.812
491	16EV183	MT. LEWIS	TERRA	1.259	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.812	2024-07-11 00:34:38.812
492	16E179	ROGGE TRAIL	TERRA	1.412	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.812	2024-07-11 00:34:38.812
493	PC2000	PACIFIC CREST TRAIL	TERRA	19.0136	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.813	2024-07-11 00:34:38.813
494	17E144	FAHEY CABIN	TERRA	1.3	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.813	2024-07-11 00:34:38.813
495	17E07	THOMAS / CLAVEY	TERRA	1.5	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.813	2024-07-11 00:34:38.813
496	17E36	WILLOW	TERRA	0.262	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.813	2024-07-11 00:34:38.813
497	16E181	RALPH RANCH	TERRA	1.311	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.814	2024-07-11 00:34:38.814
498	20E76	TYRON MEADOW	TERRA	2	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.814	2024-07-11 00:34:38.814
499	15E08	STANISLAUS TUNNEL	TERRA	1	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.815	2024-07-11 00:34:38.815
500	17E24	RUSHING MEADOW SPUR	TERRA	0.723	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.815	2024-07-11 00:34:38.815
501	16E06	ITALIAN BAR	TERRA	6.072	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.815	2024-07-11 00:34:38.815
502	16E27	WEST SIDE R/R GRADE	TERRA	5.448	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.816	2024-07-11 00:34:38.816
503	16E185	TWAIN HARTE HORSEMEN	TERRA	3.216	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.816	2024-07-11 00:34:38.816
504	16E11	RIVERSIDE SPUR	TERRA	0.795	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.817	2024-07-11 00:34:38.817
505	16E08	LUCKY STRIKE	TERRA	0.656	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.817	2024-07-11 00:34:38.817
506	18ES_HWY108	HWY 108 SNOW TRAIL	SNOW	18.46	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.817	2024-07-11 00:34:38.817
507	19E97	WEST FORK CHERRY	TERRA	4	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.818	2024-07-11 00:34:38.818
508	18E13	TOULUMNE RIVER	TERRA	3	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.818	2024-07-11 00:34:38.818
509	18E32	LOWER CLAVEY	TERRA	2.3	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.818	2024-07-11 00:34:38.818
510	18E27	WEST HERRING CREEK	TERRA	2.747	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.819	2024-07-11 00:34:38.819
511	18ES_7N75	7N75 SNOW TRAIL	SNOW	0.7	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.819	2024-07-11 00:34:38.819
512	18EV88A	\N	TERRA	0.026	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.819	2024-07-11 00:34:38.819
513	17E62	NORTH FORK INTERPERATIVE	TERRA	0.78	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.82	2024-07-11 00:34:38.82
514	18E34	BASIN CREEK CAMPGROUND	TERRA	4.351	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.82	2024-07-11 00:34:38.82
515	19ES_8N01	8N01 SNOW TRAIL	SNOW	5.03	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.82	2024-07-11 00:34:38.82
516	19ES_5N01	5N01 SNOW TRAIL	SNOW	7.02	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.821	2024-07-11 00:34:38.821
517	18E11	PINECREST TO STRAWBERRY	TERRA	0.696	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.821	2024-07-11 00:34:38.821
518	18E149	TUNNEL CR. R/R GRADE	TERRA	4.484	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.821	2024-07-11 00:34:38.821
519	18ES_7N01G	7N01G SNOW TRAIL	SNOW	0.13	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.822	2024-07-11 00:34:38.822
520	17ES_7N01	7N01 SNOW TRAIL	SNOW	9.51	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.822	2024-07-11 00:34:38.822
521	19E99	BOURLAND MEADOW	TERRA	1	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.822	2024-07-11 00:34:38.822
522	18E33	SHEERING CREEK	TERRA	3.172	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.823	2024-07-11 00:34:38.823
523	18E28	BELL MOUNTAIN	TERRA	3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.823	2024-07-11 00:34:38.823
524	17E39	GRAPEVINE	TERRA	2.565	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.823	2024-07-11 00:34:38.823
525	18E70	TROUT OVERLOOK	TERRA	4.627	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.824	2024-07-11 00:34:38.824
526	18E59	DOUBLE "S"	TERRA	0.73	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.824	2024-07-11 00:34:38.824
527	18ES_HWY4	HWY 4 SNOW TRAIL	SNOW	15.47	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.824	2024-07-11 00:34:38.824
528	18E35	SPRING GAP FOOTBRIDGE / DONNEL	TERRA	12.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.825	2024-07-11 00:34:38.825
529	18E82	UPPER CLAVEY	TERRA	1.3	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.825	2024-07-11 00:34:38.825
530	18ES_7N17	7N17 SNOW TRAIL	SNOW	2.32	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.825	2024-07-11 00:34:38.825
531	17E38	 HUNTER CREEK	TERRA	0.761	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.826	2024-07-11 00:34:38.826
532	18ES_6N65Y	6N65Y SNOW TRAIL	SNOW	0.39	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.826	2024-07-11 00:34:38.826
533	18E52	MIDDLE FORK STANISLAUS	TERRA	5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.826	2024-07-11 00:34:38.826
534	18E35A_OBSOLETE	CHINA FLAT	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.827	2024-07-11 00:34:38.827
535	18E53	MIDDLE FORK STANISLAUS	TERRA	0.8	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.827	2024-07-11 00:34:38.827
536	18E54	NEAR 5N28	TERRA	1.3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.827	2024-07-11 00:34:38.827
537	18E318	STRAW / FRASER FLAT RR BIKE TR	TERRA	2.171	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.827	2024-07-11 00:34:38.827
538	17E02J	MCTC: 7N11 TO 17E27	TERRA	1.197	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.828	2024-07-11 00:34:38.828
539	17EV155	HULL CREEK OHV - ATV	TERRA	0.354	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.828	2024-07-11 00:34:38.828
540	17EV160	HULL CREEK OHV - ATV	TERRA	0.15	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.829	2024-07-11 00:34:38.829
541	17E02C	MCTC: 7N14 TO 7N14D	TERRA	0.485	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.829	2024-07-11 00:34:38.829
542	14E17	P8#2	TERRA	0.516	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.829	2024-07-11 00:34:38.829
543	17EV157	HULL CREEK OHV - 4X4	TERRA	0.111	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.83	2024-07-11 00:34:38.83
544	17EV502	\N	TERRA	0.076	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.83	2024-07-11 00:34:38.83
545	17E02H	MCTC: 7N56Y TO 7N64Y	TERRA	2.507	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.83	2024-07-11 00:34:38.83
546	17E02B	MCTC: 7N76Y TO 7N14	TERRA	1.884	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.831	2024-07-11 00:34:38.831
547	17E02L	MCTC: BEAR VALLEY TO 7N20	TERRA	2.152	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.831	2024-07-11 00:34:38.831
548	17EV11	HULL CREEK OHV - 4X4	TERRA	0.8774	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.831	2024-07-11 00:34:38.831
549	14E04	P4	TERRA	1.007	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.831	2024-07-11 00:34:38.831
550	17E02G	MCTC:7N56YA TO 7N56Y	TERRA	0.188	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.832	2024-07-11 00:34:38.832
551	17EV162	HULL CREEK OHV - ATV	TERRA	0.191	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.832	2024-07-11 00:34:38.832
552	17EV153	HULL CREEK OHV - 4X4	TERRA	0.249	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.832	2024-07-11 00:34:38.832
553	14E12	P12	TERRA	0.772	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.833	2024-07-11 00:34:38.833
554	17E02D	MCTC: 7N14D TO 7N14C	TERRA	0.38	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.833	2024-07-11 00:34:38.833
555	14E23	ART EQUESTRIAN BYPASS	TERRA	1.473	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.833	2024-07-11 00:34:38.833
556	17E02I	MCTC: 7N64Y TO 17EV17	TERRA	1.164	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.834	2024-07-11 00:34:38.834
557	14E20	\N	TERRA	0.559	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.834	2024-07-11 00:34:38.834
558	17EV15B	HULL CREEK OHV - ATV	TERRA	0.8805	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.834	2024-07-11 00:34:38.834
559	14E11	\N	TERRA	2.084	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.835	2024-07-11 00:34:38.835
560	20E07A	UPPER LONG LAKE	TERRA	2	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.835	2024-07-11 00:34:38.835
561	17EV37	HULL CREEK OHV - ATV	TERRA	0.933	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.835	2024-07-11 00:34:38.835
562	20DC232	\N	TERRA	0.107	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.836	2024-07-11 00:34:38.836
563	17E02K	MCTC: 7N35 TO PVT ROAD	TERRA	0.108	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.836	2024-07-11 00:34:38.836
564	17EV91	HULL CREEK OHV - 4X4	TERRA	1.03	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.836	2024-07-11 00:34:38.836
565	18EV34	HULL CREEK OHV - ATV	TERRA	1.919	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.837	2024-07-11 00:34:38.837
566	18EV257	HULL CREEK OHV - ATV	TERRA	0.2283	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.837	2024-07-11 00:34:38.837
567	18EV100	HULL CREEK OHV - ATV	TERRA	0.084	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.838	2024-07-11 00:34:38.838
568	19	BEAR SPRINGS	TERRA	2.36	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.838	2024-07-11 00:34:38.838
569	9	WAR FINANCE	TERRA	2.28	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.839	2024-07-11 00:34:38.839
570	8	SPUR CROSS	TERRA	5.63	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.839	2024-07-11 00:34:38.839
571	13A	CRYSTAL CAVE	TERRA	0.11	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.839	2024-07-11 00:34:38.839
572	347	BLUE VISTA TRAIL	TERRA	0.29	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.84	2024-07-11 00:34:38.84
573	330	PASTURE TRAIL	TERRA	0.73	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.84	2024-07-11 00:34:38.84
574	342	THOMAS CREEK TRAIL	TERRA	4.14	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.84	2024-07-11 00:34:38.84
575	631	MCQUAID	TERRA	0.6	021210	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.841	2024-07-11 00:34:38.841
576	629	UTE CREEK	TERRA	1.1	021210	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.841	2024-07-11 00:34:38.841
577	1399	ST CHARLES ACCESS FROM 335	TERRA	5.0917	021203	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	0-5%	\N	2024-07-11 00:34:38.841	2024-07-11 00:34:38.841
578	19EV140	\N	TERRA	0.454	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.842	2024-07-11 00:34:38.842
579	19EV141	\N	TERRA	0.7685	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.842	2024-07-11 00:34:38.842
580	18EV435	\N	TERRA	0.511	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.842	2024-07-11 00:34:38.842
581	17EV402	\N	TERRA	0.252	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.842	2024-07-11 00:34:38.842
582	17EV490	\N	TERRA	0.45	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.843	2024-07-11 00:34:38.843
583	17EV494	\N	TERRA	0.11	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.843	2024-07-11 00:34:38.843
584	17EV471	\N	TERRA	4.768	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.843	2024-07-11 00:34:38.843
585	17EV461	\N	TERRA	0.522	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.844	2024-07-11 00:34:38.844
586	16EV430	\N	TERRA	0.711	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.844	2024-07-11 00:34:38.844
587	19EV211	\N	TERRA	0.5	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.844	2024-07-11 00:34:38.844
588	17EV475	\N	TERRA	0.818	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.845	2024-07-11 00:34:38.845
589	17EV468	\N	TERRA	0.171	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.845	2024-07-11 00:34:38.845
590	17EV483	\N	TERRA	0.199	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.845	2024-07-11 00:34:38.845
591	18EV447	\N	TERRA	0.362	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.846	2024-07-11 00:34:38.846
592	19EV213	\N	TERRA	0.771	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.846	2024-07-11 00:34:38.846
593	16EV425	\N	TERRA	0.47	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.847	2024-07-11 00:34:38.847
594	19EV142	\N	TERRA	0.492	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.847	2024-07-11 00:34:38.847
595	15EV111	\N	TERRA	1.819	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.847	2024-07-11 00:34:38.847
596	19EV129	\N	TERRA	0.901	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.848	2024-07-11 00:34:38.848
597	19EV133	\N	TERRA	0.603	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.848	2024-07-11 00:34:38.848
598	19EV151	\N	TERRA	0.731	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.848	2024-07-11 00:34:38.848
599	16EV253	TWAIN HARTE OHV-M/C	TERRA	0.887	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.849	2024-07-11 00:34:38.849
600	16EV213	TWAIN HARTE OHV-M/C	TERRA	0.062	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.849	2024-07-11 00:34:38.849
601	16EV137	CRANDALL PK OHV-M/C	TERRA	0.452	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.849	2024-07-11 00:34:38.849
602	16EV254	TWAIN HARTE OHV -M/C	TERRA	0.505	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.849	2024-07-11 00:34:38.849
603	16EV177	CRANDALL PK OHV-M/C	TERRA	0.1345	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.85	2024-07-11 00:34:38.85
604	16EV211	TWAIN HARTE OHV-M/C	TERRA	0.083	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.85	2024-07-11 00:34:38.85
605	16EV155	CRANDALL PK OHV-ATV	TERRA	0.057	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.85	2024-07-11 00:34:38.85
606	16EV265	TWAIN HARTE OHV-M/C	TERRA	0.117	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.851	2024-07-11 00:34:38.851
607	16EV257	TWAIN HARTE OHV-M/C	TERRA	1.455	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.851	2024-07-11 00:34:38.851
608	16EV210	TWAIN HARTE OHV-M/C	TERRA	0.087	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.851	2024-07-11 00:34:38.851
609	16EV123	CRANDALL PK OHV-M/C	TERRA	0.326	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.851	2024-07-11 00:34:38.851
610	16EV109	TWAIN HARTE OHV-M/C	TERRA	1.746	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.852	2024-07-11 00:34:38.852
611	16EV249	TWAIN HATRE OHV-M/C	TERRA	0.278	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.852	2024-07-11 00:34:38.852
612	16EV136	CRANDALL PK OHV-M/C	TERRA	1.185	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.852	2024-07-11 00:34:38.852
613	15EV48	COLUMBIA SE OHV-ATV	TERRA	0.636	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.853	2024-07-11 00:34:38.853
614	16EV255	TWAIN HARTE OHV -M/C	TERRA	0.428	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.853	2024-07-11 00:34:38.853
615	16EV272	TWAIN HARTE OHV-M/C	TERRA	0.525	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.853	2024-07-11 00:34:38.853
616	16EV292	CRANDALL PK OHV 4X4	TERRA	0.138	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.854	2024-07-11 00:34:38.854
617	16EV154	CRANDALL PK OHV-M/C	TERRA	1.129	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.854	2024-07-11 00:34:38.854
618	16EV110	TWAIN HARTE/CRNDLL PK - M/C	TERRA	1.15	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.854	2024-07-11 00:34:38.854
619	16EV223	TWAIN HARTE OHV-ATV	TERRA	1.351	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.854	2024-07-11 00:34:38.854
620	16EV296	CRANDALL PK OHV M/C	TERRA	0.358	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.855	2024-07-11 00:34:38.855
621	16EV81	TWAIN HARTE OHV M/C	TERRA	0.542	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.855	2024-07-11 00:34:38.855
622	SNO-405E	MOGOLLON RIM SNOWMOBILE E	SNOW	3.18	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.855	2024-07-11 00:34:38.855
623	SNO-405D	MOGOLLON RIM SNOWMOBILE D	SNOW	2.8	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.856	2024-07-11 00:34:38.856
624	339	HANNAH TRAIL	TERRA	2.97	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.856	2024-07-11 00:34:38.856
625	SNO-405B	MOGOLLON RIM SNOWMOBILE B	SNOW	1.5	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:38.856	2024-07-11 00:34:38.856
626	333	HOBO TRAIL	TERRA	0.37	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.857	2024-07-11 00:34:38.857
627	651C	PIONEERS SHORTCUT #2	TERRA	0.781	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.857	2024-07-11 00:34:38.857
628	607G	MEADOW	TERRA	0.3657	030106	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	N/A	N/A	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.857	2024-07-11 00:34:38.857
629	607H	ROBINSON HOLLOW	TERRA	2.24	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.858	2024-07-11 00:34:38.858
630	250	QUIEN SABE	TERRA	2.6	031201	\N	\N	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.858	2024-07-11 00:34:38.858
631	15	HOT AIR	TERRA	5.12	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.858	2024-07-11 00:34:38.858
632	31	HAGAN CORRAL	TERRA	2.82	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.858	2024-07-11 00:34:38.858
633	32	BEAR PEN SPRINGS	TERRA	3.54	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.859	2024-07-11 00:34:38.859
634	SNO-70.09	BIG CREEK / RIVERS CREEK	SNOW	19.4416	011607	\N	NATIVE MATERIAL	\N	321	\N	8-10%	\N	2024-07-11 00:34:38.859	2024-07-11 00:34:38.859
635	35170	GROVE DRAW ATV TRAIL	TERRA	1.25	040802	\N	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.859	2024-07-11 00:34:38.859
636	070	DRY HOLLOW	TERRA	0.027	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.86	2024-07-11 00:34:38.86
637	618	SALT CREEK	TERRA	2	021210	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.86	2024-07-11 00:34:38.86
638	35158	PLEASANT CREEK TRAIL	TERRA	1.77	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.86	2024-07-11 00:34:38.86
639	344	FIRST CREEK	TERRA	3.36	040801	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.861	2024-07-11 00:34:38.861
640	323	HORSE HOLLOW - COPLEYS	TERRA	1.4	040801	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.861	2024-07-11 00:34:38.861
641	057	SOUTH FORK OF PINE CREEK	TERRA	2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.861	2024-07-11 00:34:38.861
642	061	BALDWIN RIDGE	TERRA	1.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.861	2024-07-11 00:34:38.861
643	072	SOUTH BULLION TO GOLD HILL	TERRA	2.88	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.862	2024-07-11 00:34:38.862
644	074	BULLION PASTURE - MINERS PARK	TERRA	5.2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.862	2024-07-11 00:34:38.862
645	164	SOUTH FORK OF THREE CREEKS	TERRA	4.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.862	2024-07-11 00:34:38.862
646	071	NORTH FORK CITY CREEK	TERRA	3.6	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.863	2024-07-11 00:34:38.863
647	202	SHINGLE LOOP	TERRA	0.5	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.863	2024-07-11 00:34:38.863
648	35171	ANTIMONY KNOLL ATV TRAIL	TERRA	1.87	040802	\N	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.863	2024-07-11 00:34:38.863
649	172	BLUE LAKE	TERRA	6.9	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.864	2024-07-11 00:34:38.864
650	203	SHINGLE CR - NO CR DIVIDE	TERRA	1.6	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.864	2024-07-11 00:34:38.864
651	201	SHINGLE CREEK HEADWATERS	TERRA	3.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.864	2024-07-11 00:34:38.864
652	207	FISH CREEK CATTLE DRIVEWAY	TERRA	0.9	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.865	2024-07-11 00:34:38.865
653	060	CORK RIDGE - PINE	TERRA	2.2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.865	2024-07-11 00:34:38.865
654	35173	CHOKECHERRY ATV TRAIL	TERRA	3.17	040802	\N	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.865	2024-07-11 00:34:38.865
655	058	TANNER HOLLOW - BIG JOHN	TERRA	12.73	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.866	2024-07-11 00:34:38.866
656	171	SOUTH FORK OF CITY CREEK	TERRA	3.4	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.866	2024-07-11 00:34:38.866
657	065	SOUTH FORK OF BAKER	TERRA	4.03	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.866	2024-07-11 00:34:38.866
658	176	TUSHAR RIDGE	TERRA	4	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.866	2024-07-11 00:34:38.866
659	064	JIM REED CREEK - BOSMAN	TERRA	7.2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.867	2024-07-11 00:34:38.867
660	062	SOUTH FORK OF NORTH CREEK	TERRA	10.03	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.867	2024-07-11 00:34:38.867
661	35172	DRY BENCH TRAIL	TERRA	5.07	040802	\N	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.868	2024-07-11 00:34:38.868
662	163	LOUSY JIM CREEK	TERRA	1.3	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.868	2024-07-11 00:34:38.868
663	4854	TRAIL 4854	TERRA	4.19	040804	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.868	2024-07-11 00:34:38.868
664	4825	TRAIL 4825	TERRA	0.33	040804	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.868	2024-07-11 00:34:38.868
665	234	PORKIES PASTURE	TERRA	0.2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.869	2024-07-11 00:34:38.869
666	334	FIRST CREEK-JOHN WATTS SPRING	TERRA	0.138	040801	\N	NATIVE MATERIAL	654321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.869	2024-07-11 00:34:38.869
667	35131	BEAR CANYON TRAIL	TERRA	5	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.869	2024-07-11 00:34:38.869
668	335	COTTONWOOD - SUNSET TIE	TERRA	0.8	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.87	2024-07-11 00:34:38.87
669	35134	CHIDESTER RIDGE TRAIL	TERRA	3.606	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.87	2024-07-11 00:34:38.87
670	4275A	\N	TERRA	0.39	040804	\N	NATIVE MATERIAL	321	\N	\N	8-10%	TW01 - <12 INCHES	2024-07-11 00:34:38.871	2024-07-11 00:34:38.871
671	338	DOG VALLEY - BULL VALLEY	TERRA	4.7	040801	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.871	2024-07-11 00:34:38.871
672	3056	PINE CREEK	TERRA	2	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.871	2024-07-11 00:34:38.871
673	343	BIG OAKS - FERGSON	TERRA	4.1	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.872	2024-07-11 00:34:38.872
674	364	FREMONT STATE PARK	TERRA	2.1	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.872	2024-07-11 00:34:38.872
675	3043	SAM HENRIE	TERRA	1.4	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.872	2024-07-11 00:34:38.872
676	353	AL GAY - HORSE FLAT CUTOFF	TERRA	1.72	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.873	2024-07-11 00:34:38.873
677	363	ALMA CHRISTENSEN	TERRA	3.8	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.873	2024-07-11 00:34:38.873
678	35155	PINE CREEK TRAIL	TERRA	0.76	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.874	2024-07-11 00:34:38.874
679	35141	SOLITARE LAKE TRAIL	TERRA	1	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.874	2024-07-11 00:34:38.874
680	355	HORSE FLAT	TERRA	4.5	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.874	2024-07-11 00:34:38.874
681	055	LITTLE NORTH CREEK	TERRA	3.78	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.875	2024-07-11 00:34:38.875
682	048A	TRAIL CANYON - LOWER FISH CREE	TERRA	6.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.875	2024-07-11 00:34:38.875
683	35149	BIRCH CREEK TRAIL	TERRA	3.3	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.875	2024-07-11 00:34:38.875
684	332	WHITE SAGE FLAT - SHINGLEMILL	TERRA	2.3	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.876	2024-07-11 00:34:38.876
685	321	LOAFERS	TERRA	1	040801	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.876	2024-07-11 00:34:38.876
686	050	PIPELINE	TERRA	5.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.876	2024-07-11 00:34:38.876
687	35151	CART WHEEL TRAIL	TERRA	3.6	040802	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.877	2024-07-11 00:34:38.877
688	073	TEN MILE	TERRA	2.94	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.877	2024-07-11 00:34:38.877
689	175	PUFFER LAKE - SKYLINE	TERRA	2.1	040803	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.877	2024-07-11 00:34:38.877
690	31025	JEWELL	TERRA	3.3434	092204	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.878	2024-07-11 00:34:38.878
691	242	LITTLE FORK TRAIL	TERRA	3.3564	092102	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.878	2024-07-11 00:34:38.878
692	430	SUNDAY LICK	TERRA	5.2	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.878	2024-07-11 00:34:38.878
693	M4	MCCCT- BWC	TERRA	0.301	090401	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.879	2024-07-11 00:34:38.879
694	H58-2	MEADOWS WEST TRAIL	TERRA	0.362	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.879	2024-07-11 00:34:38.879
695	576	ROY GAP TRAIL ( SENECA ROCKS T	TERRA	0.2	092105	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	1	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.879	2024-07-11 00:34:38.879
696	236	FORK MOUNTAIN TRAIL	TERRA	20.488	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.879	2024-07-11 00:34:38.879
697	501B	NORTH FORK MTN (RED-FR79)	TERRA	3.8321	092105	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:38.88	2024-07-11 00:34:38.88
698	306A	LAUREL FORK NORTH	TERRA	9.4145	092103	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	\N	2024-07-11 00:34:38.88	2024-07-11 00:34:38.88
699	366	SHAVERS FORK TRAIL	TERRA	2.4782	092103	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.88	2024-07-11 00:34:38.88
700	490	HONEYCOMB ROCKS #490	TERRA	0.22	092104	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.881	2024-07-11 00:34:38.881
701	235	FROSTY GAP	TERRA	5.9874	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.881	2024-07-11 00:34:38.881
702	32215	SCAUR	TERRA	0.03	092204	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.881	2024-07-11 00:34:38.881
703	97231	BERRY FARM SNOMO	SNOW	1.055	092204	NOT ACCESSIBLE	SNOW	\N	321	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.882	2024-07-11 00:34:38.882
704	97237	HIX MTN RD SNOMO	SNOW	0.9	092204	\N	SNOW	\N	321	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.882	2024-07-11 00:34:38.882
705	H57-3	MACK - MALTBY HILLS-M.L.L.T. C	TERRA	0.225	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.882	2024-07-11 00:34:38.882
706	H58-8	MEADOWS - MCCCT	TERRA	0.1	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.883	2024-07-11 00:34:38.883
707	808.3	PERRY N BODAY TRAIL	TERRA	0.882	021405	\N	NATIVE MATERIAL	21	\N	\N	8-10%	\N	2024-07-11 00:34:38.883	2024-07-11 00:34:38.883
708	M120	NEWAYGO-WELLSTON SMT DNR3	SNOW	5.1989	090403	\N	SNOW	\N	321	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.883	2024-07-11 00:34:38.883
709	M10	NORTH COUNTRY TRAIL	TERRA	3.4	090403	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	0-5%	TW02 - 12-18 INCHES	2024-07-11 00:34:38.884	2024-07-11 00:34:38.884
710	H7	ALCONA ATV TRAIL	TERRA	1.43	090406	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.884	2024-07-11 00:34:38.884
711	M44	MCCT - CAD/MAN	TERRA	0.09	090403	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.884	2024-07-11 00:34:38.884
712	213	ROUGH RUN	TERRA	3.3049	092102	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.885	2024-07-11 00:34:38.885
713	263	POCAHONTAS TRAIL	TERRA	17.6288	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.885	2024-07-11 00:34:38.885
714	560	WILDLIFE TRAIL	TERRA	1.4507	092105	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.886	2024-07-11 00:34:38.886
715	701A	ALLEGHENY TRAIL # 701A	TERRA	15.1174	092106	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.886	2024-07-11 00:34:38.886
716	205	GATEWAY	TERRA	0.7	092102	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.886	2024-07-11 00:34:38.886
717	223	CRANBERRY RIDGE TRAIL	TERRA	5.8764	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.887	2024-07-11 00:34:38.887
718	260	CHARLES CREEK TRAIL	TERRA	1.0987	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.887	2024-07-11 00:34:38.887
719	501C	NORTH FORK MTN (FR79-JUDY)	TERRA	12.0529	092105	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:38.887	2024-07-11 00:34:38.887
720	M118	UDELL HILLS SMT DNR614	SNOW	0.7627	090403	NOT ACCESSIBLE	SNOW	\N	321	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:38.888	2024-07-11 00:34:38.888
721	1311W11	CREEKSIDE	TERRA	0.4835	050151	\N	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.888	2024-07-11 00:34:38.888
722	332000.14	PCT BADEN-POWELL	TERRA	6.2389	050153	\N	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.888	2024-07-11 00:34:38.888
723	1312W23.1	COLBY CANYON	TERRA	0.5732	050151	\N	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.889	2024-07-11 00:34:38.889
724	1313W08	HAINES CANYON TRAIL	TERRA	0.5646	050151	\N	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.889	2024-07-11 00:34:38.889
725	H108	OSCODA-ALCONA SMT DNR96	SNOW	18.7326	090406	\N	SNOW	\N	321	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:38.89	2024-07-11 00:34:38.89
726	126	SOUTH HADDIX TRAIL	TERRA	4	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.89	2024-07-11 00:34:38.89
777	19EV138	\N	TERRA	0.369	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.907	2024-07-11 00:34:38.907
727	432	RIVER WARMUP NORTH	TERRA	0.5	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.891	2024-07-11 00:34:38.891
728	428	BUCKLEY MOUNTAIN NORTH	TERRA	5.2	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.891	2024-07-11 00:34:38.891
729	570	TROUT TRAIL	TERRA	0.15	092105	NOT ACCESSIBLE	CRUSHED AGGREGATE OR GRAVEL	1	\N	\N	\N	\N	2024-07-11 00:34:38.891	2024-07-11 00:34:38.891
730	255A	BLUE KNOB SUMMIT	TERRA	0.1581	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.892	2024-07-11 00:34:38.892
731	426	MONDAY LICK	TERRA	3.1	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.892	2024-07-11 00:34:38.892
732	433	RIVER WARMUP SOUTH	TERRA	0.3	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.892	2024-07-11 00:34:38.892
733	431	MONDAY RIDGE	TERRA	6.6	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.893	2024-07-11 00:34:38.893
734	701H	ALLEGHENY TRAIL # 701H	TERRA	9.325	092104	NOT ACCESSIBLE	NATIVE MATERIAL	\N	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.893	2024-07-11 00:34:38.893
735	488	WYATT NATURE TRAIL# 488	TERRA	0.3	092104	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.893	2024-07-11 00:34:38.893
736	201B	LAKE ACCESS TRAIL B	TERRA	0.2	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	\N	\N	2024-07-11 00:34:38.893	2024-07-11 00:34:38.893
737	201A	LAKE ACCESS TRAIL A	TERRA	0.07	092102	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.894	2024-07-11 00:34:38.894
738	701C	ALLEGHENY TRAIL # 701C	TERRA	5.0253	092106	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.894	2024-07-11 00:34:38.894
739	423	POWERLINE TRAIL # 423	TERRA	1.5	092104	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.894	2024-07-11 00:34:38.894
740	567-A	WHISPERING SPRUCE CONNECTOR	TERRA	0.0367	092105	\N	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.895	2024-07-11 00:34:38.895
741	701I	ALLEGHENY TRAIL # 701I	TERRA	4.9966	092104	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.895	2024-07-11 00:34:38.895
742	701B	ALLEGHENY TRAIL # 701B	TERRA	11.0686	092106	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.895	2024-07-11 00:34:38.895
743	701E	ALLEGHENY TRAIL # 701E	TERRA	2.3061	092104	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.895	2024-07-11 00:34:38.895
744	701K	ALLEGHENY TRAIL # 701K	TERRA	3.8416	092104	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.896	2024-07-11 00:34:38.896
745	701D	ALLEGHENY TRAIL # 701D	TERRA	1.682	092104	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.896	2024-07-11 00:34:38.896
746	701WS	ALLEGHENY TRAIL #701WS	TERRA	23.8	092106	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.896	2024-07-11 00:34:38.896
747	701_D1_B	ALTR-LOW WATER GLADWIN TO CR12	TERRA	4.3865	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.897	2024-07-11 00:34:38.897
748	701_D1_C	ALLEGHENY-LOWER GLADY TO RTE33	TERRA	8.7426	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.897	2024-07-11 00:34:38.897
749	701_D3_A	ALLEGHENY - RTE 33 TO RCR27	TERRA	10.3659	092103	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.897	2024-07-11 00:34:38.897
750	701J	ALLEGHENY TRAIL # 701J	TERRA	3.3766	092104	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.898	2024-07-11 00:34:38.898
751	05236B	CEDRO CREEK INTERPRETIVE	TERRA	1.0715	030305	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:38.898	2024-07-11 00:34:38.898
752	225	NORTH BEND TRAIL	TERRA	2.2746	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.899	2024-07-11 00:34:38.899
753	166	 ZERO GRADE ACCESSIBLE TR	TERRA	0.4337	092101	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.899	2024-07-11 00:34:38.899
754	271	MIDDLE FORK TRAIL	TERRA	0.0407	092102	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.9	2024-07-11 00:34:38.9
755	H57-6	MACK - MIO TRAIL	TERRA	0.2	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.9	2024-07-11 00:34:38.9
756	1329	NELSON RIDGE (CAPE MTN TRAIL)	TERRA	3.4433	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.9	2024-07-11 00:34:38.9
757	1320	DARLINGTONIA WALKWAY	TERRA	0.1	061208	ACCESSIBLE	OTHER	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.901	2024-07-11 00:34:38.901
758	1334	OREGON DUNES LOOP TRAIL	TERRA	3.942	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.901	2024-07-11 00:34:38.901
759	1359	CHIEF TSILTCOOS	TERRA	0.7854	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.902	2024-07-11 00:34:38.902
760	1335	TAYLOR DUNES	TERRA	0.4	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.902	2024-07-11 00:34:38.902
761	1321.1	SUTTON CREEK LOOP	TERRA	1.32	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.902	2024-07-11 00:34:38.902
762	1333	SILTCOOS LAKE TRAIL	TERRA	2.9452	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.902	2024-07-11 00:34:38.902
763	1350	NORTH RIDGE-MARYS PEAK	TERRA	6.09	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.903	2024-07-11 00:34:38.903
764	1336	TAHKENITCH CREEK	TERRA	2.18	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.903	2024-07-11 00:34:38.903
765	1353	TAHKENITCH DUNES TRAIL	TERRA	1.9	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.903	2024-07-11 00:34:38.903
766	1324	EAST RIDGE-MARYS PEAK	TERRA	2.4	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.904	2024-07-11 00:34:38.904
767	1337	WAXMYRTLE	TERRA	0.5659	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.904	2024-07-11 00:34:38.904
768	1362.1	HORSE CREEK TRAIL NORTH	TERRA	5.6035	061208	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.904	2024-07-11 00:34:38.904
769	1321.2	SUTTON CREEK NORTH	TERRA	1.5075	061208	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:38.904	2024-07-11 00:34:38.904
770	1321.5	SUTTON LAKE TRAIL	TERRA	0.25	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:38.905	2024-07-11 00:34:38.905
771	1322.2	ALDER DUNE DAY USE TRAIL	TERRA	0.2018	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:38.905	2024-07-11 00:34:38.905
772	1321.3	SUTTON CRK BOLDUC'S MEADOW	TERRA	1.25	061208	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:38.905	2024-07-11 00:34:38.905
773	1322.1	ALDER LAKE TRAIL	TERRA	0.6287	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:38.906	2024-07-11 00:34:38.906
774	1321.4	SUTTON CAMPGROUND TIE	TERRA	0.413	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:38.906	2024-07-11 00:34:38.906
775	17EV17	\N	TERRA	1.066	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.906	2024-07-11 00:34:38.906
776	17EV34	\N	TERRA	0.266	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.907	2024-07-11 00:34:38.907
778	19DC145	\N	TERRA	0.038	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.907	2024-07-11 00:34:38.907
779	18EV276	HULL CREEK OHV-ATV	TERRA	0.098	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.907	2024-07-11 00:34:38.907
780	17EV120	CRANDALL PEAK OHV-M/C	TERRA	0.109	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.908	2024-07-11 00:34:38.908
781	16EV78	TWAIN HARTE OHV-ATV	TERRA	0.191	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.908	2024-07-11 00:34:38.908
782	18EV70	HULL CREEK OHV-4X4	TERRA	0.7056	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.908	2024-07-11 00:34:38.908
783	17EV79	HULL CREEK OHV-ATV	TERRA	1.287	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.909	2024-07-11 00:34:38.909
784	16EV101	TWAIN HARTE OHV-MC	TERRA	1.894	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.909	2024-07-11 00:34:38.909
785	15EV105	\N	TERRA	2.1059	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.909	2024-07-11 00:34:38.909
786	17EV485	\N	TERRA	0.703	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.909	2024-07-11 00:34:38.909
787	15EV109	\N	TERRA	0.4095	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.91	2024-07-11 00:34:38.91
788	16EV257A	\N	TERRA	0.025	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.91	2024-07-11 00:34:38.91
789	18EV529	TRAIL OF THE GARGOYLES	TERRA	0.223	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.91	2024-07-11 00:34:38.91
790	17EV416	\N	TERRA	0.517	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.911	2024-07-11 00:34:38.911
791	16EV404	\N	TERRA	0.082	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.911	2024-07-11 00:34:38.911
792	17EV410	\N	TERRA	0.314	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.911	2024-07-11 00:34:38.911
793	19EV170	\N	TERRA	1.01	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.911	2024-07-11 00:34:38.911
794	17EV67A	\N	TERRA	0.3825	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.912	2024-07-11 00:34:38.912
795	17EV418	\N	TERRA	0.472	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.912	2024-07-11 00:34:38.912
796	18EV170	\N	TERRA	2.8492	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.912	2024-07-11 00:34:38.912
797	16EV266A	\N	TERRA	0.034	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.912	2024-07-11 00:34:38.912
798	17EV404	\N	TERRA	0.7037	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.913	2024-07-11 00:34:38.913
799	18EV440	\N	TERRA	1.42	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.913	2024-07-11 00:34:38.913
800	17EV220B	TWAIN HARTE OHV - ATV	TERRA	0.047	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.913	2024-07-11 00:34:38.913
801	18EV133	STRAWBERRY/PINECREST OHV-4X4	TERRA	0.347	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.914	2024-07-11 00:34:38.914
802	17EV45	HULL CREEK OHV-ATV	TERRA	1.7123	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.914	2024-07-11 00:34:38.914
803	17EV210	CRANDALL PEAK OHV-4X4	TERRA	1.092	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.914	2024-07-11 00:34:38.914
804	16EV01	TWAIN HARTE OHV-4X4	TERRA	0.046	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.914	2024-07-11 00:34:38.914
805	17EV210A	CRANDALL PEAK OHV - M/C	TERRA	0.319	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.915	2024-07-11 00:34:38.915
806	17EV202	HULL CREEK OHV-4X4	TERRA	0.376	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.915	2024-07-11 00:34:38.915
807	17EV80	HULL CREEK OHV-ATV	TERRA	0.226	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.915	2024-07-11 00:34:38.915
808	17EV220	TWAIN HARTE OHV - ATV	TERRA	0.331	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.916	2024-07-11 00:34:38.916
809	18EV271	PINECREST OHV-ATV	TERRA	0.665	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.916	2024-07-11 00:34:38.916
810	15EV47	COLUMBIA SE OHV-4X4	TERRA	0.634	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.916	2024-07-11 00:34:38.916
811	17EV85	HULL CREEK OHV-ATV	TERRA	2.011	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.916	2024-07-11 00:34:38.916
812	17EV118	CRANDALL PEAK OHV-M/C	TERRA	1.37	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.917	2024-07-11 00:34:38.917
813	17EV104	CRANDALL PEAK OHV-M/C	TERRA	0.872	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.917	2024-07-11 00:34:38.917
814	346	COTTONWOOD TANK TRAIL	TERRA	4.03	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.917	2024-07-11 00:34:38.917
815	653A	PINTAIL LAKE #2	TERRA	0.06	030107	ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.918	2024-07-11 00:34:38.918
816	18E01	NORTH LAKE ALPINE	TERRA	2.739	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.918	2024-07-11 00:34:38.918
817	16EV433	\N	TERRA	0.333	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.918	2024-07-11 00:34:38.918
818	18E21	UNION ROCK LAKE	TERRA	1.515	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.918	2024-07-11 00:34:38.918
819	20E03	DISASTER CREEK	TERRA	7	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.919	2024-07-11 00:34:38.919
820	18E24	WOODCHUCK	TERRA	1.835	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.919	2024-07-11 00:34:38.919
821	19E35	ANCIENT DWARVES I.T.	TERRA	0.399	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.919	2024-07-11 00:34:38.919
822	19E16_OBSOLETE	COUNTY LINE	TERRA	3	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.92	2024-07-11 00:34:38.92
823	19E01	EMIGRANT TRAIL	TERRA	8.455	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.92	2024-07-11 00:34:38.92
824	19E24	STUDHORSE MEADOW	TERRA	3.5	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.92	2024-07-11 00:34:38.92
825	20E05	ARNOT CREEK	TERRA	6.922	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.921	2024-07-11 00:34:38.921
826	17EV152	CALAVERAS DOME OHV-ATV RT7B	TERRA	0.752	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.921	2024-07-11 00:34:38.921
827	656C	PORTER-MAVERICK CONNECTOR C	TERRA	0.85	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	\N	2024-07-11 00:34:38.921	2024-07-11 00:34:38.921
828	655A	LOS BURROS MOTORIZED A	TERRA	8.82	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.922	2024-07-11 00:34:38.922
829	641	GHOST OF THE COYOTE	TERRA	3.8	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.922	2024-07-11 00:34:38.922
830	51	LARGO	TERRA	4.7	030101	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.923	2024-07-11 00:34:38.923
831	140A	GENERAL CROOK CONNECTOR	TERRA	2.6	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.923	2024-07-11 00:34:38.923
832	1356	THREE MILE LAKE SOUTH	TERRA	1	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.923	2024-07-11 00:34:38.923
833	SNO-331H	FIR	SNOW	0.9	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.924	2024-07-11 00:34:38.924
834	652A	FOUR SPRINGS CONNECTOR	TERRA	0.68	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.924	2024-07-11 00:34:38.924
835	350	COTTONWOOD TRAIL	TERRA	2.12	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.925	2024-07-11 00:34:38.925
836	SNO-331A	PINYON TRAIL	SNOW	2.3519	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.925	2024-07-11 00:34:38.925
837	1330	LAGOON TRAIL	TERRA	0.4	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.925	2024-07-11 00:34:38.925
838	301	PIGEON LOOP	TERRA	4.74	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.926	2024-07-11 00:34:38.926
839	7	WILDBUNCH	TERRA	8.9	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.926	2024-07-11 00:34:38.926
840	17EV425	\N	TERRA	2.271	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.926	2024-07-11 00:34:38.926
841	16DC406	\N	TERRA	0.64	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.927	2024-07-11 00:34:38.927
842	18EV404	\N	TERRA	0.32	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.927	2024-07-11 00:34:38.927
843	20DC231	\N	TERRA	0.065	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.927	2024-07-11 00:34:38.927
844	19EV117	\N	TERRA	0.503	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.927	2024-07-11 00:34:38.927
845	17EV414	\N	TERRA	0.619	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.928	2024-07-11 00:34:38.928
846	18DC527	\N	TERRA	0.021	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.928	2024-07-11 00:34:38.928
847	18EV413	\N	TERRA	0.166	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.928	2024-07-11 00:34:38.928
848	16EV411	\N	TERRA	0.411	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.929	2024-07-11 00:34:38.929
849	18DC526	\N	TERRA	0.136	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.929	2024-07-11 00:34:38.929
850	20EV226	\N	TERRA	0.132	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.929	2024-07-11 00:34:38.929
851	19EV131	\N	TERRA	0.202	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.93	2024-07-11 00:34:38.93
852	18EV535	\N	TERRA	0.11	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.93	2024-07-11 00:34:38.93
853	17DC454	\N	TERRA	0.058	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.93	2024-07-11 00:34:38.93
854	19EV210	\N	TERRA	0.245	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.931	2024-07-11 00:34:38.931
855	15EV104	\N	TERRA	1.0388	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.931	2024-07-11 00:34:38.931
856	17EV416A	\N	TERRA	0.047	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.931	2024-07-11 00:34:38.931
857	17EV400	\N	TERRA	0.524	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.932	2024-07-11 00:34:38.932
858	20EV229	\N	TERRA	0.101	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.932	2024-07-11 00:34:38.932
859	19DC211	\N	TERRA	0.124	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.932	2024-07-11 00:34:38.932
860	FR8843	\N	TERRA	0.857	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.932	2024-07-11 00:34:38.932
861	19EV107	\N	TERRA	0.178	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.932	2024-07-11 00:34:38.933
862	18EV454	\N	TERRA	0.1233	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.933	2024-07-11 00:34:38.933
863	17EV426	\N	TERRA	0.755	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.933	2024-07-11 00:34:38.933
864	18DC453	\N	TERRA	0.092	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.933	2024-07-11 00:34:38.933
865	17EV481	\N	TERRA	0.171	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.934	2024-07-11 00:34:38.934
866	61602E	\N	TERRA	0.231	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.934	2024-07-11 00:34:38.934
867	18EV424	\N	TERRA	0.116	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.934	2024-07-11 00:34:38.934
868	17EV489	\N	TERRA	0.138	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.934	2024-07-11 00:34:38.934
869	20EV228	\N	TERRA	0.165	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.935	2024-07-11 00:34:38.935
870	18E07	BUMMER/WHEATS	TERRA	8.965	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.935	2024-07-11 00:34:38.935
871	16EV434	\N	TERRA	1.704	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.935	2024-07-11 00:34:38.935
872	17EV498	\N	TERRA	0.126	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.936	2024-07-11 00:34:38.936
873	18EV402	\N	TERRA	0.613	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.936	2024-07-11 00:34:38.936
874	17EV501	\N	TERRA	1.515	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.936	2024-07-11 00:34:38.936
875	17EV496	\N	TERRA	0.544	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.936	2024-07-11 00:34:38.936
876	16EV436	\N	TERRA	0.115	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.937	2024-07-11 00:34:38.937
877	18EV270	PINECREST OHV-4X4	TERRA	0.363	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.937	2024-07-11 00:34:38.937
878	17EV71	TWAIN HARTE OHV-ATV	TERRA	1.143	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.937	2024-07-11 00:34:38.937
879	18EV67	HULL CREEK OHV-M/C-ATV	TERRA	1.679	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.937	2024-07-11 00:34:38.937
880	18EV277	HULL CREEK OHV-4X4	TERRA	0.094	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.938	2024-07-11 00:34:38.938
881	15EV38	COLUMBIA SE OHV-4X4	TERRA	0.597	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.938	2024-07-11 00:34:38.938
882	16EV54	DEER CREEK (UPPER)	TERRA	2.357	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.938	2024-07-11 00:34:38.938
883	17EV205	TWAIN HARTE OHV-ATV	TERRA	0.253	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.939	2024-07-11 00:34:38.939
884	19EV29	PINECREST OHV-ATV	TERRA	0.468	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.939	2024-07-11 00:34:38.939
885	16EV186	CALAVERAS DM OHV 4X4	TERRA	0.468	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.939	2024-07-11 00:34:38.939
886	16EV267	CRANDALL PK OHV-M/C	TERRA	0.27	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.939	2024-07-11 00:34:38.939
887	16EV259	TWAIN HARTE OHV-M/C	TERRA	0.447	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.94	2024-07-11 00:34:38.94
888	16EV111	TWAIN HARTE OHV-M/C	TERRA	0.444	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.94	2024-07-11 00:34:38.94
889	16EV262	TWAIN HARTE OHV-ATV	TERRA	0.086	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.94	2024-07-11 00:34:38.94
890	16EV152	CRANDALL PK OHV-ATV	TERRA	0.332	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.94	2024-07-11 00:34:38.94
891	19EV97	DARDANELLE OHV-4X4	TERRA	0.843	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.941	2024-07-11 00:34:38.941
892	16EV188	CALAVERAS DM OHV-4X4	TERRA	0.244	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.941	2024-07-11 00:34:38.941
893	16EV117	CRANDALL PK. OHV-M/C	TERRA	0.211	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.941	2024-07-11 00:34:38.941
894	16EV108	TWAIN HARTE OHV-M/C	TERRA	0.741	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.942	2024-07-11 00:34:38.942
895	16EV176	CRANDALL PK OHV-M/C	TERRA	0.504	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.942	2024-07-11 00:34:38.942
896	18EV254	PINECREST OHV-ATV	TERRA	0.511	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.942	2024-07-11 00:34:38.942
897	22	CRABTREE	TERRA	4.87	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.942	2024-07-11 00:34:38.942
898	18A	SALT HOUSE CONNECTION	TERRA	0.03	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.942	2024-07-11 00:34:38.942
899	18	SALTHOUSE	TERRA	1.1764	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.943	2024-07-11 00:34:38.943
900	12	FRYE	TERRA	3.49	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.943	2024-07-11 00:34:38.943
901	16	SHEEP SADDLE	TERRA	1.46	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.943	2024-07-11 00:34:38.943
902	26	MCBRIDE MESA	TERRA	0.2337	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.944	2024-07-11 00:34:38.944
903	415A	CHEVELON CROSSING ACCESS	TERRA	0.04	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.944	2024-07-11 00:34:38.944
904	20	STRAYHORSE	TERRA	12.3	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.944	2024-07-11 00:34:38.944
905	302	BLOWOUT TRAIL	TERRA	0.58	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.945	2024-07-11 00:34:38.945
906	33	EAST EAGLE	TERRA	10.99	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.945	2024-07-11 00:34:38.945
907	406B	LONG DRAW OHV SOUTH	TERRA	1.92	030102	\N	IMPORTED COMPACTED MATERIAL	N/A	N/A	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.945	2024-07-11 00:34:38.945
908	SNO-405C	MOGOLLON RIM SNOWMOBILE C	SNOW	5.1	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.946	2024-07-11 00:34:38.946
909	47A	TURKEY SPRING TRAIL	TERRA	0.09	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.946	2024-07-11 00:34:38.946
910	116A	WOODS CANYON NATURE TRAIL CONN	TERRA	0.06	030102	\N	IMPORTED COMPACTED MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.947	2024-07-11 00:34:38.947
911	651B	PIONEERS SHORTCUT #1	TERRA	0.413	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.947	2024-07-11 00:34:38.947
912	345	ROSE PEAK TRAIL	TERRA	0.52	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.947	2024-07-11 00:34:38.947
913	SNO-331F	JUNIPER	SNOW	2.9	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.947	2024-07-11 00:34:38.947
914	SNO-602E	PINE J	SNOW	1.68	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.948	2024-07-11 00:34:38.948
915	349	AC TRAIL	TERRA	1.13	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.948	2024-07-11 00:34:38.948
916	650	MOGOLLON RIM	TERRA	0.508	030107	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.948	2024-07-11 00:34:38.948
917	656B	PORTER-MAVERICK CONNECTOR B	TERRA	0.959	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	\N	2024-07-11 00:34:38.949	2024-07-11 00:34:38.949
918	SNO-602C	OSPREY	SNOW	0.4	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.949	2024-07-11 00:34:38.949
919	SNO-602F	OWL	SNOW	0.35	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.949	2024-07-11 00:34:38.949
920	19EV135	\N	TERRA	0.55	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.949	2024-07-11 00:34:38.949
921	18E30	TRAIL OF THE SURVIVORS I.T.	TERRA	0.294	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.95	2024-07-11 00:34:38.95
922	18E02	UNDERWOOD VALLEY	TERRA	7.752	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.95	2024-07-11 00:34:38.95
923	18E19	SAPPS AUTH 4X4	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.95	2024-07-11 00:34:38.95
924	17EV488	\N	TERRA	0.161	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.951	2024-07-11 00:34:38.951
925	16EV437	\N	TERRA	0.618	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.951	2024-07-11 00:34:38.951
926	16EV438	\N	TERRA	0.256	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.951	2024-07-11 00:34:38.951
927	18E16	SUMMIT LAKE	TERRA	0.181	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.951	2024-07-11 00:34:38.951
928	18E18	BEAR VALLEY/LAKE ALPINE	TERRA	1.396	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.952	2024-07-11 00:34:38.952
929	18E20	ELEPHANT ROCK	TERRA	2.596	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.952	2024-07-11 00:34:38.952
930	18E93	PIONEER	TERRA	0.289	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.952	2024-07-11 00:34:38.952
931	18E49	BURGSON LAKE	TERRA	0.684	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.952	2024-07-11 00:34:38.952
932	18E37_OBSOLETE	STRAWBERRY	TERRA	0.1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.953	2024-07-11 00:34:38.953
933	17EV487	\N	TERRA	0.29	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.953	2024-07-11 00:34:38.953
934	18E04	SPICER/WHEATS	TERRA	3.94	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.953	2024-07-11 00:34:38.953
935	18E08	SHOOFLY	TERRA	3	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.954	2024-07-11 00:34:38.954
936	19E06	WHEATS MEADOW	TERRA	7.631	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.954	2024-07-11 00:34:38.954
937	19E09	BEAR LAKE	TERRA	1	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.954	2024-07-11 00:34:38.954
938	17EV499	\N	TERRA	0.116	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.955	2024-07-11 00:34:38.955
939	16EV432	\N	TERRA	0.862	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.955	2024-07-11 00:34:38.955
940	16EV187	CALAVERAS DM OHV 4X4	TERRA	0.409	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.955	2024-07-11 00:34:38.955
941	16EV266	TWAIN HARTE OHV-M/C	TERRA	0.213	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.956	2024-07-11 00:34:38.956
942	16EV263	TWAIN HARTE OHV-M/C	TERRA	0.02	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.956	2024-07-11 00:34:38.956
943	16EV192	CALAVERAS DOME OHV-4X4	TERRA	0.466	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.956	2024-07-11 00:34:38.956
944	19EV93	DONNEL LK OHV -ATV	TERRA	1.672	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.956	2024-07-11 00:34:38.956
945	17EV16	CALAVERAS DOME OHV 4X4 RT6A,6F	TERRA	2.539	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.957	2024-07-11 00:34:38.957
946	16EV178	CRANDALL PK OHV-M/C	TERRA	0.9459	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.957	2024-07-11 00:34:38.957
947	17EV117	CRANDALL PEAK OHV-M/C	TERRA	1.1728	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.957	2024-07-11 00:34:38.957
948	16EV258	TWAIN HARTE OHV-M/C	TERRA	0.471	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.958	2024-07-11 00:34:38.958
949	16EV190	CALAVERAS DOME OHV-ATV	TERRA	1.552	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.958	2024-07-11 00:34:38.958
950	17EV151	CALAVERAS DM OHV 4X4 RT4C	TERRA	2.554	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.958	2024-07-11 00:34:38.958
951	18EV268	JAWBONE RIDGE OHV-ATV	TERRA	0.241	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.958	2024-07-11 00:34:38.958
952	SNO-602D	RED TAIL	SNOW	0.3425	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.959	2024-07-11 00:34:38.959
953	656A	PORTER MOUNTAIN SCENIC VISTA	TERRA	0.72	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	\N	2024-07-11 00:34:38.959	2024-07-11 00:34:38.959
954	13	PAINTED BLUFF	TERRA	10.64	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.959	2024-07-11 00:34:38.959
955	25	RED MOUNTAIN	TERRA	7.22	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.96	2024-07-11 00:34:38.96
956	11	HL CANYON	TERRA	5.39	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.96	2024-07-11 00:34:38.96
957	SNO-536	SARDINE SNOWMOBILE	SNOW	2.4	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.96	2024-07-11 00:34:38.96
1267	12E67-C05	12E67-C05	TERRA	0.019	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.05	2024-07-11 00:34:39.05
958	14	AD BAR	TERRA	11.92	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.961	2024-07-11 00:34:38.961
959	47	HIGHLINE	TERRA	15.0718	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.961	2024-07-11 00:34:38.961
960	318	PIGEON CONNECTION TRAIL	TERRA	0.66	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.961	2024-07-11 00:34:38.961
961	311	HICKEY SPRINGS	TERRA	9.79	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.962	2024-07-11 00:34:38.962
962	8A	GRANVILLE SPRING TRAIL	TERRA	0.31	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.962	2024-07-11 00:34:38.962
963	317	PIGEON TRAIL	TERRA	2.33	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.962	2024-07-11 00:34:38.962
964	313	SILVER TRAIL	TERRA	0.49	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.962	2024-07-11 00:34:38.962
965	41	LITTLE BLUE	TERRA	9.68	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.963	2024-07-11 00:34:38.963
966	312	YELLOWJACKET TRAIL	TERRA	1.98	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.963	2024-07-11 00:34:38.963
967	572A	GRANVILLE CONNECTION TRAIL	TERRA	0.08	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.963	2024-07-11 00:34:38.963
968	237B	237B OHV	TERRA	0.435	030102	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.964	2024-07-11 00:34:38.964
969	79	EAGLE NATIONAL RECREATION TR	TERRA	22.74	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.964	2024-07-11 00:34:38.964
970	SNO-602	POLE KNOLL	SNOW	6.2	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.964	2024-07-11 00:34:38.964
971	655	MAVERICK MOTORIZED	TERRA	6	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	10-12%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.965	2024-07-11 00:34:38.965
972	SNO-331E	SPRUCE	SNOW	0.5	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.965	2024-07-11 00:34:38.965
973	657	OSPREY CONNECTOR	TERRA	2.4065	030107	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	\N	2024-07-11 00:34:38.965	2024-07-11 00:34:38.965
974	SNO-331D	WIILOW	SNOW	1.4	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.965	2024-07-11 00:34:38.965
975	76C	FOOTE CREEK C	TERRA	5.984	030101	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.966	2024-07-11 00:34:38.966
976	348	CRABTREE PARK TRAIL	TERRA	2.5	030103	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	0-5%	\N	2024-07-11 00:34:38.966	2024-07-11 00:34:38.966
977	18E05	SPICER/SAND FLAT	TERRA	5.367	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:38.966	2024-07-11 00:34:38.966
978	SNO-331B	CEDAR	SNOW	2.2	030106	NOT ACCESSIBLE	NAT - NATIVE MATERIAL	N/A	N/A	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.967	2024-07-11 00:34:38.967
979	0038	NORTH FORK DRY FORK	TERRA	1.597	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.967	2024-07-11 00:34:38.967
980	739	ARCH TRAIL	TERRA	2.43	011507	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.967	2024-07-11 00:34:38.967
981	516	SNOWMOBILE TRAIL D	SNOW	2.2	011507	\N	SNOW	\N	21	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.967	2024-07-11 00:34:38.967
982	1069	ROCK CREEK	TERRA	2.884	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.968	2024-07-11 00:34:38.968
983	174	BOSQUE	TERRA	1.3	030304	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:38.968	2024-07-11 00:34:38.968
984	0048	QUEANT	TERRA	0.638	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.968	2024-07-11 00:34:38.968
985	SNO-1165	DOWD MOUNTAIN X-C SKI	SNOW	0.0693	040101	\N	SNOW	\N	21	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.968	2024-07-11 00:34:38.968
986	T8225-A	NFST-8225-A	TERRA	0.47	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.969	2024-07-11 00:34:38.969
987	H58-6	MEADOWS - HUGHES LAKE TRAIL	TERRA	0.016	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.969	2024-07-11 00:34:38.969
988	T1323-D	NFST-1323-D	TERRA	0.54	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.969	2024-07-11 00:34:38.969
989	T6930-E	NFST-6930-E	TERRA	1.1069	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.97	2024-07-11 00:34:38.97
990	60081-B	COOKS RUN HUNTER	TERRA	0.1	090703	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.97	2024-07-11 00:34:38.97
991	1055	JACKSON PARK	TERRA	2	040103	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.97	2024-07-11 00:34:38.97
992	0151	GRIZZLY RIDGE	TERRA	0.0147	040102	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.97	2024-07-11 00:34:38.97
993	97230	CAMP 7 SNOMO	SNOW	0.1	092204	NOT ACCESSIBLE	\N	\N	321	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.971	2024-07-11 00:34:38.971
994	SNO-1158	LAKE CREEK X-C SKI	SNOW	0.01	040101	\N	NATIVE MATERIAL	\N	21	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.971	2024-07-11 00:34:38.971
995	1171	HICKERSON PK TO SHEEP CK BYPAS	TERRA	1.4059	040101	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.971	2024-07-11 00:34:38.971
996	1044A	HIGHLINE CUTOFF	TERRA	0.74	040103	\N	NATIVE MATERIAL	21	\N	\N	0-5%	\N	2024-07-11 00:34:38.971	2024-07-11 00:34:38.971
997	97209	CHERRY MTN. CONNECTOR SNOMO	SNOW	0.3153	092204	NOT ACCESSIBLE	SNOW	\N	321	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:38.972	2024-07-11 00:34:38.972
998	1105	LITTLE RABBIT LONG RIDGE LOOP	TERRA	0.1263	040104	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.972	2024-07-11 00:34:38.972
999	60085	CANOE-PRESQUE ISLE RIVER	WATER	3	090702	NOT ACCESSIBLE	WATER	\N	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:38.972	2024-07-11 00:34:38.972
1000	T3921	NFST-3921	TERRA	0.41	090703	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.972	2024-07-11 00:34:38.972
1001	T1385	NFST-1385	TERRA	0.47	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.973	2024-07-11 00:34:38.973
1002	0148	JADE RAM SPUR NW	TERRA	0.0442	040102	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.973	2024-07-11 00:34:38.973
1003	60153	NFST-60153	TERRA	0.08	090704	NOT ACCESSIBLE	NATIVE MATERIAL	5321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.973	2024-07-11 00:34:38.973
1004	0134	ELKHORN-WEST FORK	TERRA	4.764	040103	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.974	2024-07-11 00:34:38.974
1005	T4584-L	NFST-4584-L	TERRA	0.3	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.974	2024-07-11 00:34:38.974
1006	T2426	NFST-2426	TERRA	0.15	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.974	2024-07-11 00:34:38.974
1007	T1388	NFST-1388	TERRA	0.233	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.974	2024-07-11 00:34:38.974
1008	T1708-B	NFST-1708-B	TERRA	0.2	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.975	2024-07-11 00:34:38.975
1009	T6936	NFST-6936	TERRA	1.2	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.975	2024-07-11 00:34:38.975
1010	T2465-C	NFST-2465-C	TERRA	0.22	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.975	2024-07-11 00:34:38.975
1011	M30	HOLTON MOTORCYCLE TRAIL	TERRA	11.852	090401	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.975	2024-07-11 00:34:38.975
1012	H57-7	MACK - BULL GAP TRAIL	TERRA	2.55	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.976	2024-07-11 00:34:38.976
1013	T6987-A4	NFST-6987-A4	TERRA	0.32	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.976	2024-07-11 00:34:38.976
1014	554	ROCKY POINT TRAIL	TERRA	1.9203	092105	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.976	2024-07-11 00:34:38.976
1015	T5086-D8	NFST-5086-D8	TERRA	0.4	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.977	2024-07-11 00:34:38.977
1016	T1671	NFST-1671	TERRA	0.6	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.977	2024-07-11 00:34:38.977
1017	823	YELLOWSTONE TRAIL	TERRA	1.5	021405	\N	IMPORTED COMPACTED MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:38.977	2024-07-11 00:34:38.977
1018	60	MCGREGOR SHORELINE	TERRA	1.06	011405	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW02 - 12-18 INCHES	2024-07-11 00:34:38.978	2024-07-11 00:34:38.978
1019	H113-1	HIGHBANKS TRAIL POWERLINE SPUR	SNOW	0.524	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:38.978	2024-07-11 00:34:38.978
1020	T1462	NFST-1462	TERRA	1.1	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.978	2024-07-11 00:34:38.978
1021	128A	WEIGEL MOUNTAIN A	TERRA	0.22	011405	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.978	2024-07-11 00:34:38.978
1022	T6930-K1	NFST-6930-K1	TERRA	0.4	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.979	2024-07-11 00:34:38.979
1023	60075-A	SCAUP LAKE HUNTER	TERRA	1.039	090706	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.979	2024-07-11 00:34:38.979
1024	T1501-C	NFST-1501-C	TERRA	0.293	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.979	2024-07-11 00:34:38.979
1025	60096	BIRCH CAMPSITE	TERRA	0.292	090706	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.98	2024-07-11 00:34:38.98
1026	T8907	NFST-8907	TERRA	0.1	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.98	2024-07-11 00:34:38.98
1027	11321 SNOW	KINNEY SPUR	SNOW	13.9828	090901	\N	NATIVE MATERIAL	\N	321	\N	0-5%	\N	2024-07-11 00:34:38.98	2024-07-11 00:34:38.98
1028	SNO-12E16	MOSQUITO RIDGE	SNOW	28.17	051754	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.98	2024-07-11 00:34:38.98
1029	5212	HORSESHOE TO HARRINGTON	TERRA	1.16	041555	\N	NATIVE MATERIAL	54321	\N	\N	8-10%	\N	2024-07-11 00:34:38.981	2024-07-11 00:34:38.981
1030	H58-5	MEADOWS -LUZERNE TRAIL	TERRA	0.249	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.981	2024-07-11 00:34:38.981
1031	T3212-B	NFST-3212-B	TERRA	0.59	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.981	2024-07-11 00:34:38.981
1032	M4-2	MCCT - BIG O SPUR	TERRA	0.189	090401	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	10-12%	\N	2024-07-11 00:34:38.982	2024-07-11 00:34:38.982
1033	0129	WIGWAM-PAPOOSE LAKES	TERRA	0.5018	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.982	2024-07-11 00:34:38.982
1034	SNO-99602	EAST FORK SM	SNOW	5.268	011006	\N	SNOW	\N	21	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:38.982	2024-07-11 00:34:38.982
1035	806	LAKE LOUISE	TERRA	1.655	021405	\N	NATIVE MATERIAL	21	\N	\N	10-12%	\N	2024-07-11 00:34:38.983	2024-07-11 00:34:38.983
1036	501A	NORTH FORK MTN (N.F GAP-RED)	TERRA	7.4014	092105	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.983	2024-07-11 00:34:38.983
1037	514	RED CREEK TRAIL	TERRA	5.3	092105	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.983	2024-07-11 00:34:38.983
1038	701L	ALLEGHENY-HOSTERMAN-CASS	TERRA	7.1889	092103	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:38.983	2024-07-11 00:34:38.983
1039	626	PLATTE SPRINGS	TERRA	0.395	021210	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.984	2024-07-11 00:34:38.984
1040	SNO-369.N	MILLSET	SNOW	1.29	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	5-8%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.984	2024-07-11 00:34:38.984
1041	T3608-D	NFST-3608-D	TERRA	0.2	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.984	2024-07-11 00:34:38.984
1042	531	MONARCH RIDGE	TERRA	0.35	021202	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:38.984	2024-07-11 00:34:38.984
1043	T560-L	NFST-560-L	TERRA	0.4	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.985	2024-07-11 00:34:38.985
1044	T3502	NFST-3502	TERRA	0.4	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.985	2024-07-11 00:34:38.985
1045	SNO-369.L	CROSSOVER	SNOW	1.17	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	8-10%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.985	2024-07-11 00:34:38.985
1046	114	TRAIL CREEK SPUR	TERRA	0.62	021008	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.986	2024-07-11 00:34:38.986
1047	954	HEWLETT GULCH	TERRA	6.083	021005	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.986	2024-07-11 00:34:38.986
1048	30.2	LOST LAKE ACCESS	TERRA	0.227	021008	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:38.986	2024-07-11 00:34:38.986
1049	21	SOUTH FORK	TERRA	23.923	021008	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.987	2024-07-11 00:34:38.987
1050	94.3	PICNIC SPUR	TERRA	0.026	021008	ACCESSIBLE	OTHER	1	\N	\N	0-5%	\N	2024-07-11 00:34:38.987	2024-07-11 00:34:38.987
1051	3505	MAPLE CANYON	TERRA	0.0151	041553	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.987	2024-07-11 00:34:38.987
1052	2027	TARGHEE CREEK	TERRA	2.1497	041552	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.988	2024-07-11 00:34:38.988
1053	3596	PINE CREEK	TERRA	3.0705	041553	\N	NATIVE MATERIAL	4321	\N	\N	8-10%	\N	2024-07-11 00:34:38.988	2024-07-11 00:34:38.988
1054	1057	YELLOWSTONE	TERRA	0.02	040103	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.988	2024-07-11 00:34:38.988
1055	5463	TINCUP DRIVEWAY (MARSHALL CYN)	TERRA	3.9985	041555	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:38.988	2024-07-11 00:34:38.988
1056	0138	GRIZZLY RIDGE TO SOUTH FRANCIS	TERRA	0.133	040102	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.989	2024-07-11 00:34:38.989
1057	1160	DON HATCH MEMORIAL	TERRA	0.0362	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.989	2024-07-11 00:34:38.989
1058	1081	DUCHESNE RIVER	TERRA	0.007	040104	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.989	2024-07-11 00:34:38.989
1059	1016	OLD CARTER MILITARY	TERRA	0.5021	040101	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.989	2024-07-11 00:34:38.989
1060	1079	PINE ISLAND LOOP	TERRA	4.773	040104	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.99	2024-07-11 00:34:38.99
1061	1052	WEYMAN CREEK	TERRA	1.145	040101	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.99	2024-07-11 00:34:38.99
1062	T8911-A	NFST-8911-A	TERRA	0.27	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.99	2024-07-11 00:34:38.99
1063	T2113-C	NFST-2113-C	TERRA	0.587	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.99	2024-07-11 00:34:38.99
1064	1338	THREE MILE LAKE NORTH	TERRA	2.9814	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.991	2024-07-11 00:34:38.991
1065	T3611-G	NFST-3611-G	TERRA	0.6	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.991	2024-07-11 00:34:38.991
1066	T6934-B	NFST-6934-B	TERRA	0.9	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.991	2024-07-11 00:34:38.991
1067	1347	HARRIS RANCH	TERRA	2.623	061208	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.991	2024-07-11 00:34:38.991
1068	125	MOOSE RIDGE	TERRA	3.41	011501	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.992	2024-07-11 00:34:38.992
1069	713-A	FOURMILE CONNECTOR	TERRA	1.315	011507	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.992	2024-07-11 00:34:38.992
1070	SNO-99662	HIGHLINE LOOP SM	SNOW	2.35	011006	\N	SNOW	\N	21	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:38.992	2024-07-11 00:34:38.992
1071	256	BARRENSHE TRAIL	TERRA	4.48	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.993	2024-07-11 00:34:38.993
1072	11E43	HUMBUG (LOOP 5)	TERRA	17.59	051754	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.994	2024-07-11 00:34:38.994
1073	SNO-12E19	PACKER LAKE SNOWMOBILE TR	SNOW	0.6345	051753	\N	SNOW	\N	321	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:38.994	2024-07-11 00:34:38.994
1074	983	JACKS GULCH CG LOOP TRAIL	TERRA	0.526	021005	\N	NATIVE MATERIAL	31	\N	\N	0-5%	\N	2024-07-11 00:34:38.994	2024-07-11 00:34:38.994
1075	258	MANN GULCH	TERRA	0.8	011512	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.995	2024-07-11 00:34:38.995
1076	672	COMB CREEK	TERRA	0.496	011506	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	8-10%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.995	2024-07-11 00:34:38.995
1077	T7050-F	NFST-7050-F	TERRA	0.23	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.995	2024-07-11 00:34:38.995
1078	97173	SCARFACE  XC	SNOW	1.2	092204	NOT ACCESSIBLE	SNOW	\N	21	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:38.996	2024-07-11 00:34:38.996
1079	H112-7	CORSAIR, 12-A, NORTH SPUR	SNOW	0.152	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:38.996	2024-07-11 00:34:38.996
1080	T1501-G	NFST-1501-G	TERRA	0.3788	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.996	2024-07-11 00:34:38.996
1081	T219-H1	NFST-219-H1	TERRA	0.14	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.996	2024-07-11 00:34:38.996
1082	T530-C2	NFST-530-C2	TERRA	0.6	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.997	2024-07-11 00:34:38.997
1083	60100-I	BLUE ROAD HUNTER	TERRA	0.08	090704	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.997	2024-07-11 00:34:38.997
1084	T2100-J	NFST-2100-J	TERRA	0.2	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:38.997	2024-07-11 00:34:38.997
1085	310	BEULAH	TERRA	4.2392	092103	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.997	2024-07-11 00:34:38.997
1086	1083	EAST SLOPE BURNT RIDGE	TERRA	6.309	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.998	2024-07-11 00:34:38.998
1087	H58-1	MEADOWS-M33 TRAIL	TERRA	3.56	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.998	2024-07-11 00:34:38.998
1088	SNO4-11C	UP COPPER SPUR C SNOMO	SNOW	0.783	011514	\N	SNOW	\N	321	\N	0-5%	\N	2024-07-11 00:34:38.998	2024-07-11 00:34:38.998
1089	SNO2-338	HAHN CREEK	SNOW	6.596	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.999	2024-07-11 00:34:38.999
1090	1020	TEEPEE-RED LAKE	TERRA	2.041	040101	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.999	2024-07-11 00:34:38.999
1091	SNO-0153	LITTLE BRUSH CREEK X-C SKI	SNOW	2.789	040102	\N	SNOW	\N	21	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:38.999	2024-07-11 00:34:38.999
1092	H57-14	MACK - M33 CONNECTOR	TERRA	0.257	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:38.999	2024-07-11 00:34:38.999
1093	60138-E	LAND O'LAKES SKI TRAIL	SNOW	0.022	090706	NOT ACCESSIBLE	SNOW	\N	21	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39	2024-07-11 00:34:39
1094	564	HIGH MEADOW TRAIL	TERRA	1.9833	092105	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39	2024-07-11 00:34:39
1095	T3660-I	NFST-3660-I	TERRA	0.4	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39	2024-07-11 00:34:39
1096	T5359	NFST-5359	TERRA	1	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39	2024-07-11 00:34:39
1097	557	LEADING RIDGE TRAIL	TERRA	5.2865	092105	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.001	2024-07-11 00:34:39.001
1098	11E44	CODFISH (LOOP 6)	TERRA	15.32	051754	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.001	2024-07-11 00:34:39.001
1099	SNO2-326B	RED MOUNTAIN B SNOMO	SNOW	0.589	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.001	2024-07-11 00:34:39.001
1100	SNO2-322E	MARYSVILLE LOOP E SNOMO	SNOW	0.158	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.002	2024-07-11 00:34:39.002
1101	SNO4-03	NORTH FORK KEEPCOOL SNOMO	SNOW	5.1	011514	\N	SNOW	\N	321	\N	5-8%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.002	2024-07-11 00:34:39.002
1102	SNO2-326C	RED MOUNTAIN C SNOMO	SNOW	3.345	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.002	2024-07-11 00:34:39.002
1103	SNO2-322C	MARYSVILLE LOOP C SNOMO	SNOW	3.424	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.002	2024-07-11 00:34:39.002
1104	SNO2-322D	MARYSVILLE LOOP D SNOMO	SNOW	1.663	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.003	2024-07-11 00:34:39.003
1105	SNO2-325A	RIMINI ELLISTON A SNOMO	SNOW	1.368	011512	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.003	2024-07-11 00:34:39.003
1106	220.1	CABIN CREEK ADMIN SPUR	TERRA	0.245	011501	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.003	2024-07-11 00:34:39.003
1107	1018	POTTER-LAMB LAKES	TERRA	0.002	040101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.004	2024-07-11 00:34:39.004
1108	T6975-F	NFST-6975-F	TERRA	0.38	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.004	2024-07-11 00:34:39.004
1109	T2180-D1	NFST-2180-D1	TERRA	0.3	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.004	2024-07-11 00:34:39.004
1110	60116-A	DAVIDSON LAKES	TERRA	0.0947	090704	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.004	2024-07-11 00:34:39.004
1111	T4115	NFST-4115	TERRA	0.43	090703	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.005	2024-07-11 00:34:39.005
1112	T9326	NFST-9326	TERRA	0.2	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.005	2024-07-11 00:34:39.005
1113	1021	LOST LAKE	TERRA	0.011	040101	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.005	2024-07-11 00:34:39.005
1114	T5239	NFST-5239	TERRA	1.0158	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.005	2024-07-11 00:34:39.005
1115	T733-K	NFST-733-K	TERRA	0.39	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.006	2024-07-11 00:34:39.006
1116	T6903	NFST-6903	TERRA	0.5	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.006	2024-07-11 00:34:39.006
1117	T3965	NFST-3965	TERRA	0.83	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.006	2024-07-11 00:34:39.006
1118	T1199-K4	NFST-1199-K4	TERRA	0.1	090705	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.007	2024-07-11 00:34:39.007
1119	60075	SCAUP LAKE HUNTER	TERRA	0.7	090706	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.007	2024-07-11 00:34:39.007
1120	60095	CANOE-BRULE RIVER	WATER	9.8	090703	NOT ACCESSIBLE	WATER	\N	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.007	2024-07-11 00:34:39.007
1121	T8646-C	NFST-8646-C	TERRA	0.2	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.008	2024-07-11 00:34:39.008
1122	SNO-12E14	HUMBUG	SNOW	5.3	051754	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.008	2024-07-11 00:34:39.008
1123	101	VASQUEZ PASS	TERRA	0.388	021008	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.008	2024-07-11 00:34:39.008
1124	H116-8	REID, OVERFLOW PARKING SPUR	SNOW	0.05	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.008	2024-07-11 00:34:39.008
1125	T210-B1	NFST-210-B1	TERRA	0.15	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.009	2024-07-11 00:34:39.009
1126	T6935-G1	NFST-6935-G1	TERRA	0.4	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.009	2024-07-11 00:34:39.009
1127	T3662-E	NFST-3662-E	TERRA	0.28	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.009	2024-07-11 00:34:39.009
1128	979	MOUNT MARGARET	TERRA	3.704	021005	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.009	2024-07-11 00:34:39.009
1129	989	CORRAL CREEK	TERRA	0.081	021005	\N	NATIVE MATERIAL	21	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.01	2024-07-11 00:34:39.01
1130	305	STONE CAMP RUN	TERRA	1.4456	092103	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.01	2024-07-11 00:34:39.01
1131	15E75	DONNER LAKE RIM TRAIL	TERRA	12.46	051757	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.01	2024-07-11 00:34:39.01
1132	526	DOBBIN GRADE TRAIL	TERRA	4.2952	092105	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	\N	2024-07-11 00:34:39.011	2024-07-11 00:34:39.011
1133	804.2A	WHISKEY MOUNTAIN CUTOFF	TERRA	2.02	021405	\N	NATIVE MATERIAL	21	\N	\N	10-12%	\N	2024-07-11 00:34:39.011	2024-07-11 00:34:39.011
1134	280	BRUFFEY RESERVE TRAIL	TERRA	1.0903	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.012	2024-07-11 00:34:39.012
1135	255	BLUE KNOB TRAIL	TERRA	0.7178	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.012	2024-07-11 00:34:39.012
1136	315	CAMP FIVE RUN	TERRA	1.5793	092103	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.013	2024-07-11 00:34:39.013
1137	1065	TWOROOSE PASS	TERRA	3.241	040103	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.013	2024-07-11 00:34:39.013
1138	T3574	NFST-3574	TERRA	0.4	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.013	2024-07-11 00:34:39.013
1139	T2108-N1	NFST-2108-N1	TERRA	0.4	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.013	2024-07-11 00:34:39.013
1140	T1226-D	NFST-1226-D	TERRA	1.72	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.014	2024-07-11 00:34:39.014
1141	T3614-D2	NFST-3614-D2	TERRA	0.3	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.014	2024-07-11 00:34:39.014
1142	60119-B	INTERIOR GROUSE MGMT HUNTER	TERRA	0.268	090704	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.014	2024-07-11 00:34:39.014
1143	1094	WILBUR BENCH	TERRA	1.326	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.014	2024-07-11 00:34:39.014
1144	1089	COW HOLLOW	TERRA	0.702	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.015	2024-07-11 00:34:39.015
1145	H57-5	MACK - TABOR TRAIL	TERRA	0.79	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.015	2024-07-11 00:34:39.015
1146	H57-2	MACK - MALTBY HILLS LOOP TRAIL	TERRA	0.05	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.015	2024-07-11 00:34:39.015
1147	94.2	CHALLENGER	TERRA	0.024	021008	ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	0-5%	\N	2024-07-11 00:34:39.015	2024-07-11 00:34:39.015
1148	SNO-369.F	BEAVER CREEK	SNOW	6.13	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.016	2024-07-11 00:34:39.016
1149	SNO-369.M	NORTH PEAK	SNOW	3.3	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	5-8%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.016	2024-07-11 00:34:39.016
1150	SNO-369.FF	MARION LAKE	SNOW	0.29	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.016	2024-07-11 00:34:39.016
1151	SNO-369.J	SNOSLIDE	SNOW	4.14	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.017	2024-07-11 00:34:39.017
1152	7.1	DEVIL'S THUMB PARK	TERRA	0.74	021008	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.017	2024-07-11 00:34:39.017
1153	840	BAUGHMAN'S SADDLE SINGLE TRACK	TERRA	0.62	021001	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.017	2024-07-11 00:34:39.017
1154	10062B	LAU. DIVIDE FITNESS-SPUR B	TERRA	0.0336	090901	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.017	2024-07-11 00:34:39.017
1155	6156	CRAMER BASIN	TERRA	1	041307	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.018	2024-07-11 00:34:39.018
1156	717	SIGNAL BUTTE MULTI USE	TERRA	1.32	021209	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.018	2024-07-11 00:34:39.018
1157	6138	SLIM LAKE ENTRY POINT	TERRA	0.32	090905	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	0-5%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.018	2024-07-11 00:34:39.018
1158	137	SECOND CREEK	TERRA	0.897	021008	\N	NATIVE MATERIAL	21	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.019	2024-07-11 00:34:39.019
1159	5224	HUCKLEBERRY BASIN	TERRA	0.1361	041555	\N	NATIVE MATERIAL	54321	\N	\N	8-10%	\N	2024-07-11 00:34:39.019	2024-07-11 00:34:39.019
1160	3595	CAMEL HOLLOW	TERRA	0.1684	041553	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.019	2024-07-11 00:34:39.019
1161	17963	JUARISTI 1	TERRA	1.102	041707	\N	NATIVE MATERIAL	5321	\N	\N	0-5%	\N	2024-07-11 00:34:39.02	2024-07-11 00:34:39.02
1162	17612	SMITH	TERRA	0.786	041707	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:39.02	2024-07-11 00:34:39.02
1163	17605B	POWER HOUSE EAST SPUR B	TERRA	0.032	041707	\N	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.02	2024-07-11 00:34:39.02
1164	17962A	JUARISTI CONNECTOR	TERRA	0.108	041707	\N	NATIVE MATERIAL	5321	\N	\N	0-5%	\N	2024-07-11 00:34:39.02	2024-07-11 00:34:39.02
1165	17960	FORT RUBY 5	TERRA	0.145	041707	\N	NATIVE MATERIAL	5321	\N	\N	0-5%	\N	2024-07-11 00:34:39.021	2024-07-11 00:34:39.021
1166	4202	FOGG HILL/N. FORK PALISADES	TERRA	1.25	041554	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.021	2024-07-11 00:34:39.021
1167	5162	SANDPIT LAKE-RANGE LAKE	TERRA	0.4542	090905	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	5-8%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.021	2024-07-11 00:34:39.021
1168	62	RIDGE LOOP	TERRA	1.333	091403	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.021	2024-07-11 00:34:39.021
1169	1319	SWEET CREEK	TERRA	2.5687	061208	\N	IMPORTED COMPACTED MATERIAL	321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.022	2024-07-11 00:34:39.022
1170	SNO7417	VIRGINIA HILL SKI AREA	SNOW	5.3452	011401	\N	SNOW	\N	21	\N	0-5%	\N	2024-07-11 00:34:39.022	2024-07-11 00:34:39.022
1171	5447	CARIBOU CITY- MORGAN MEADOWS	TERRA	5.6258	041555	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:39.023	2024-07-11 00:34:39.023
1172	4121	PROSPECT PEAK 121	TERRA	0.84	041554	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.023	2024-07-11 00:34:39.023
1173	212	LICK BRANCH	TERRA	2.0828	092102	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.023	2024-07-11 00:34:39.023
1174	85339	TANBARK HIKING	TERRA	3.627	091903	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.024	2024-07-11 00:34:39.024
1175	85238B	BOO-BOOS DELIGHT	TERRA	0.064	091903	\N	NATIVE MATERIAL	31	\N	\N	10-12%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.024	2024-07-11 00:34:39.024
1176	D85026F	SNOWMOBILE CONNECTOR 33	SNOW	0.1546	091902	\N	SNOW	\N	21	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.024	2024-07-11 00:34:39.024
1177	13E26	BIG TREE NATURE	TERRA	0.21	051754	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.025	2024-07-11 00:34:39.025
1178	1326	HOLMAN VISTA	TERRA	0.0695	061208	ACCESSIBLE	ASPHALT	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.025	2024-07-11 00:34:39.025
1179	1325	MEADOW EDGE	TERRA	1.62	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.025	2024-07-11 00:34:39.025
1180	85421	SCHT - SEGMENT 21	TERRA	8.8397	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.025	2024-07-11 00:34:39.025
1181	85417	SCHT - SEGMENT 17	TERRA	2.1327	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.026	2024-07-11 00:34:39.026
1182	85416	SCHT - SEGMENT 16	TERRA	0.8973	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.026	2024-07-11 00:34:39.026
1183	231	FISHERMANS TRAIL	TERRA	1.1718	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.026	2024-07-11 00:34:39.026
1184	17952	NORTH 2	TERRA	0.091	041707	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.027	2024-07-11 00:34:39.027
1185	17517A	PEARL PEAK SPUR	TERRA	0.415	041707	\N	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.027	2024-07-11 00:34:39.027
1186	17516C	RIGHT RANCH SPUR C	TERRA	0.191	041707	\N	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.027	2024-07-11 00:34:39.027
1187	701_D1_E	ALLEGHENY-CANAAN TO GLADWIN	TERRA	13.3494	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.028	2024-07-11 00:34:39.028
1188	701_D1_D	ALTR-GLADWIN TO LOWER GLADY	TERRA	4.9162	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.028	2024-07-11 00:34:39.028
1189	701_D1_F	ALLEGHENY/CANYON RIM TO DAVIS	TERRA	13.2605	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.028	2024-07-11 00:34:39.028
1190	701_D1_H	ALLEGHENY TRAIL SPUR	TERRA	0.1092	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.028	2024-07-11 00:34:39.028
1191	701_D1_G	ALLEGHENY-154 TO CANYON RIM	TERRA	8.0621	092101	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.029	2024-07-11 00:34:39.029
1192	63	SCHOOL HOUSE LOOP	TERRA	3.8699	091403	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.029	2024-07-11 00:34:39.029
1193	262A	NORTH FORK MEADOW CREEK TIE	TERRA	0.83	011404	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.029	2024-07-11 00:34:39.029
1194	J15718	ROBERTS CR CAMPING SPUR	TERRA	0.18	011506	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.03	2024-07-11 00:34:39.03
1195	268.1	CIRCLE CREEK CONNECTOR	TERRA	0.477	011501	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.03	2024-07-11 00:34:39.03
1196	SNO2-312	BIG PINE LOOP	SNOW	1.062	011512	\N	SNOW	\N	21	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.03	2024-07-11 00:34:39.03
1197	429	STILLHOUSE	TERRA	4.9	092104	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.03	2024-07-11 00:34:39.03
1198	85403	SCHT - PARRISH	TERRA	1.9215	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.031	2024-07-11 00:34:39.031
1199	1020A	GREEN WOOD LOOP	TERRA	5.9496	091401	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.031	2024-07-11 00:34:39.031
1200	SNO336J	BRUIN CREEK A SNOWMOBILE SPUR	SNOW	1.49	011401	\N	SNOW	\N	321	\N	5-8%	\N	2024-07-11 00:34:39.031	2024-07-11 00:34:39.031
1201	5112	WEBSTER CREEK	TERRA	5.3939	041555	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:39.032	2024-07-11 00:34:39.032
1202	823.1B	BONNEVILLE TRAIL	TERRA	1.39	021405	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:39.032	2024-07-11 00:34:39.032
1203	1022	SOUTH FORK EIGHTMILE	TERRA	3.1176	041551	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	20-30%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.032	2024-07-11 00:34:39.032
1204	6111	CONTINENTAL DIVIDE NST	TERRA	0.01	041308	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.033	2024-07-11 00:34:39.033
1205	T2108-H6	NFST-2108-H6	TERRA	0.5	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.033	2024-07-11 00:34:39.033
1206	0039	SOUTH FORK ASHLEY	TERRA	5.2	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.034	2024-07-11 00:34:39.034
1207	558	DUNKENBARGER TRAIL	TERRA	1.6576	092105	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.034	2024-07-11 00:34:39.034
1208	362	CROUCH RIDGE	TERRA	2.7089	092103	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.034	2024-07-11 00:34:39.034
1209	T2108-M2	NFST-2108-M2	TERRA	0.55	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.034	2024-07-11 00:34:39.034
1210	60100-J	BLUE ROAD HUNTER	TERRA	0.226	090704	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.035	2024-07-11 00:34:39.035
1211	T2410	NFST-2410	TERRA	1.5	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.035	2024-07-11 00:34:39.035
1212	T530-C	NFST-530-C	TERRA	0.13	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.035	2024-07-11 00:34:39.035
1213	M10-11	NCT BOWMAN LAKE SPUR	TERRA	0.099	090401	NOT ACCESSIBLE	NATIVE MATERIAL	31	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.035	2024-07-11 00:34:39.035
1214	1014	NORTH ELK PARK	TERRA	0.1652	040101	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.036	2024-07-11 00:34:39.036
1215	1058	FIVE POINT LAKE	TERRA	3.885	040103	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.036	2024-07-11 00:34:39.036
1216	0051	RED BELLY LAKE	TERRA	0.271	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.036	2024-07-11 00:34:39.036
1217	T6970	NFST-6970	TERRA	0.1	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.037	2024-07-11 00:34:39.037
1218	T5235-C	NFST-5235-C	TERRA	0.3	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.037	2024-07-11 00:34:39.037
1219	1067	DRY CANYON	TERRA	0.445	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.037	2024-07-11 00:34:39.037
1220	1047	WEST FORK WHITEROCKS	TERRA	0.017	040103	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.038	2024-07-11 00:34:39.038
1221	T6930-QB	NFST-6930-QB	TERRA	0.59	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.038	2024-07-11 00:34:39.038
1222	T3780	NFST-3780	TERRA	1.75	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.038	2024-07-11 00:34:39.038
1223	05200	10K	TERRA	2.29	030305	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.038	2024-07-11 00:34:39.038
1224	6037	BEAGLE CREEK	TERRA	9.157	041301	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.039	2024-07-11 00:34:39.039
1225	51316 SNOW	KAWISHIWI TRIANGLE LONE PINE	SNOW	0.39	090905	\N	NATIVE MATERIAL	\N	321	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.039	2024-07-11 00:34:39.039
1226	T3616-E	NFST-3616-E	TERRA	0.2	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.039	2024-07-11 00:34:39.039
1227	H112-2	CORSAIR, 2-9-8 SPUR	SNOW	0.1648	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.04	2024-07-11 00:34:39.04
1228	1009	LEONA SPRING-MANILA PARK	TERRA	3.403	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.04	2024-07-11 00:34:39.04
1229	05130	CREST	TERRA	0.4014	030305	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.04	2024-07-11 00:34:39.04
1230	0049	EAST FORK WHITEROCKS RIVER	TERRA	8.243	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.04	2024-07-11 00:34:39.04
1231	H116-7	REID, PARKING LOT SPUR	SNOW	0.02	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.041	2024-07-11 00:34:39.041
1232	T3974	NFST-3974	TERRA	0.1	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.041	2024-07-11 00:34:39.041
1233	H112-12	CORSAIR, G TO SV PARK SPUR	SNOW	0.036	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.041	2024-07-11 00:34:39.041
1234	97261	MT WILLARD TRAIL	TERRA	0.095	092204	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.041	2024-07-11 00:34:39.041
1235	60082	MORRISON CREEK HUNTER	TERRA	0.49	090703	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.041	2024-07-11 00:34:39.041
1236	97225	BALANCE ROCK SNOMO	SNOW	1.0628	092204	NOT ACCESSIBLE	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.042	2024-07-11 00:34:39.042
1237	05335	DAVID CANYON ROAD	TERRA	2	030305	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.042	2024-07-11 00:34:39.042
1238	97239	EASTSIDE XC	SNOW	2.8	092204	NOT ACCESSIBLE	SNOW	\N	21	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.042	2024-07-11 00:34:39.042
1239	M29-2	ARROWHEAD TRAIL CONNECTOR	TERRA	0.232	090403	\N	NATIVE MATERIAL	31	\N	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.042	2024-07-11 00:34:39.042
1240	M133	WARD HILLS-IRONS SMT DNR345	SNOW	0.62	090401	NOT ACCESSIBLE	SNOW	\N	321	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.043	2024-07-11 00:34:39.043
1241	T730-J6	NFST-730-J6	TERRA	0.4	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.043	2024-07-11 00:34:39.043
1242	T2108-K	NFST-2108-K	TERRA	0.5	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.043	2024-07-11 00:34:39.043
1243	T1235-C1	NFST-1235-C1	TERRA	0.1	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.044	2024-07-11 00:34:39.044
1244	60081-C	COOKS RUN HUNTER	TERRA	0.44	090703	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.044	2024-07-11 00:34:39.044
1245	T6881-G	NFST-6881-G	TERRA	0.2	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.044	2024-07-11 00:34:39.044
1246	M113	CABERFAE WAY SMT DNR37	SNOW	4.4641	090403	NOT ACCESSIBLE	SNOW	\N	321	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.044	2024-07-11 00:34:39.044
1247	21019	DEERYARD LOOP	TERRA	1.6104	090902	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.045	2024-07-11 00:34:39.045
1248	6016	ANDY STONE	TERRA	0.0058	041556	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.045	2024-07-11 00:34:39.045
1249	16E48	PROSSER HILL JEEP	TERRA	2.53	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.045	2024-07-11 00:34:39.045
1250	10E20-C07	10E20-C07	TERRA	0.009	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.046	2024-07-11 00:34:39.046
1251	13E10-C10	13E10-C10	TERRA	0.0189	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.046	2024-07-11 00:34:39.046
1252	16E68-CE	16E68-CE	TERRA	0.079	051757	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.046	2024-07-11 00:34:39.046
1253	97213	NORTH BRANCH SNOMO	SNOW	2.6	092204	\N	SNOW	\N	321	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.046	2024-07-11 00:34:39.046
1254	10019E	PFEIFFER LAKE SPUR E	TERRA	0.0588	090901	\N	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.047	2024-07-11 00:34:39.047
1255	SNO-17E04	ANDESITE WEST OSV	SNOW	3.47	051757	\N	SNOW	\N	321	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.047	2024-07-11 00:34:39.047
1256	6119	GLENMORE-SCHLAMN	TERRA	0.65	090906	\N	NATIVE MATERIAL	1	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.047	2024-07-11 00:34:39.047
1257	6113	CUMMINGS-KORB	TERRA	0.24	090906	\N	NATIVE MATERIAL	1	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.047	2024-07-11 00:34:39.047
1258	5163	AZION LAKE-BASSWOOD LAKE	TERRA	0.0184	090905	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.048	2024-07-11 00:34:39.048
1259	6231	WILLIAMS LAKE HANDICAPPED	TERRA	0.26	041301	ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.048	2024-07-11 00:34:39.048
1260	0028	LAKE PARK	TERRA	2.777	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.048	2024-07-11 00:34:39.048
1261	H112-15	CORSAIR, H-E-14-B SPUR	SNOW	0.164	090406	\N	SNOW	\N	21	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.048	2024-07-11 00:34:39.048
1262	1017	BROWNE-SPIRIT LAKE	TERRA	3.336	040101	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.049	2024-07-11 00:34:39.049
1263	11E19-D10	FINNING ATV	TERRA	0.47	051754	\N	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.049	2024-07-11 00:34:39.049
1264	13E58-C05	13E58-C05	TERRA	0.0188	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.049	2024-07-11 00:34:39.049
1265	16E42	SAGEHEN OHV TIE 2	TERRA	0.26	051757	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.05	2024-07-11 00:34:39.05
1266	11E10-E10	11E10-E10	TERRA	0.024	051753	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:39.05	2024-07-11 00:34:39.05
1268	16E43	LOWER SAGEHEN OHV LOOP	TERRA	1.8	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.05	2024-07-11 00:34:39.05
1269	1310	CASCADE HEAD	TERRA	6	061201	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.051	2024-07-11 00:34:39.051
1270	1322	ALDER DUNE TRAIL	TERRA	0.65	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.051	2024-07-11 00:34:39.051
1271	16E46	SAGEHEN PROSSER OHV TIE	TERRA	1.127	051757	\N	NATIVE MATERIAL	6321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.051	2024-07-11 00:34:39.051
1272	11E21-C05	11E21-C05	TERRA	0.012	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.051	2024-07-11 00:34:39.051
1273	14E42-C05	14E42-C05	TERRA	0.0189	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.052	2024-07-11 00:34:39.052
1274	10E18-C20	10E18-C20	TERRA	0.019	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.052	2024-07-11 00:34:39.052
1275	1330.1	LAGOON TRAIL	TERRA	0.0397	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.052	2024-07-11 00:34:39.052
1276	1336.1	TAHKENITCH CREEK	TERRA	0.5445	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.053	2024-07-11 00:34:39.053
1277	1397.1	BERRY CREEK LOOP	TERRA	0.477	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.053	2024-07-11 00:34:39.053
1278	1344B	UPPER CLEAWOX OHV TRAIL	TERRA	0.1	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.053	2024-07-11 00:34:39.053
1279	09E01	BRANDY CITY OHV	TERRA	0.2538	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.053	2024-07-11 00:34:39.053
1280	11E16	LAST CHANCE TIE	TERRA	1.0669	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.054	2024-07-11 00:34:39.054
1281	T5171	NFST-5171	TERRA	1.89	090702	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.054	2024-07-11 00:34:39.054
1282	96616	SAWYER RIVER SNOMO	SNOW	5.1214	092205	NOT ACCESSIBLE	SNOW	\N	321	\N	8-10%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.054	2024-07-11 00:34:39.054
1283	1060	FISH CREEK	TERRA	3.792	040103	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.055	2024-07-11 00:34:39.055
1284	T3785-A	NFST-3785-A	TERRA	0.4	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.055	2024-07-11 00:34:39.055
1285	60100-H	BLUE ROAD HUNTER	TERRA	0.121	090704	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.055	2024-07-11 00:34:39.055
1286	T1236	NFST-1236	TERRA	0.43	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.055	2024-07-11 00:34:39.055
1287	T502-C	NFST-502-C	TERRA	1.6	090705	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.056	2024-07-11 00:34:39.056
1288	T2020-D	NFST-2020-D	TERRA	0.1	090704	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.056	2024-07-11 00:34:39.056
1289	T5109-B	NFST-5109-B	TERRA	0.2	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.056	2024-07-11 00:34:39.056
1290	97208	ROSEBROOK SNOMO	SNOW	3.1719	092204	\N	SNOW	\N	321	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.057	2024-07-11 00:34:39.057
1291	H58-7	MEADOWS - M72-PARMALEE TRAIL	TERRA	0.63	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.057	2024-07-11 00:34:39.057
1292	11E71-C05	11E71-C05	TERRA	0.019	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.057	2024-07-11 00:34:39.057
1293	12E07-C20	MONARCH OHV TRAIL	TERRA	1.117	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.057	2024-07-11 00:34:39.057
1294	11E06-E20	11E06-E20	TERRA	0.11	051753	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:39.058	2024-07-11 00:34:39.058
1295	16E39	SAGEHEN OHV LOOP 1	TERRA	4.4	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.058	2024-07-11 00:34:39.058
1296	1371	GWYNN CREEK	TERRA	2.325	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.058	2024-07-11 00:34:39.058
1297	1306	SAINT PERPETUA	TERRA	1.4418	061208	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.058	2024-07-11 00:34:39.058
1298	1382	CUMMINS CREEK	TERRA	3.3164	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.059	2024-07-11 00:34:39.059
1299	1305	WHISPERING SPRUCE	TERRA	0.3	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	10-12%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.059	2024-07-11 00:34:39.059
1300	1370	HECETA LIGHTHOUSE	TERRA	0.3	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.059	2024-07-11 00:34:39.059
1301	1317	PAWN	TERRA	0.6	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.06	2024-07-11 00:34:39.06
1302	6221	WRIGHT	TERRA	1.77	041556	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.06	2024-07-11 00:34:39.06
1303	CDT_F	BERTHOUD PASS WEST	TERRA	1.865	021007	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.06	2024-07-11 00:34:39.06
1304	12E16	COLUMBO OHV TRL.	TERRA	0.509	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.06	2024-07-11 00:34:39.06
1305	16E59	DOG VALLEY WEST OHV	TERRA	0.5	051757	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.061	2024-07-11 00:34:39.061
1306	17884F	WATER 4 SPUR F	TERRA	0.58	041707	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.061	2024-07-11 00:34:39.061
1307	17884E	WATER 4 CONNECTOR E	TERRA	0.106	041707	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.061	2024-07-11 00:34:39.061
1308	17968	TUB	TERRA	0.065	041707	\N	NATIVE MATERIAL	5321	\N	\N	0-5%	\N	2024-07-11 00:34:39.061	2024-07-11 00:34:39.061
1309	17966	JUARISTI 3	TERRA	0.017	041707	\N	NATIVE MATERIAL	5321	\N	\N	0-5%	\N	2024-07-11 00:34:39.062	2024-07-11 00:34:39.062
1310	369	YOKUM RIDGE SPUR	TERRA	0.827	092103	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.062	2024-07-11 00:34:39.062
1311	6195	NICKERSON GROVE	TERRA	3.78	041556	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	12-20%	\N	2024-07-11 00:34:39.062	2024-07-11 00:34:39.062
1312	SNO-12E21	GROOMER ACCESS	SNOW	0.75	051753	\N	SNOW	\N	321	\N	8-10%	TW09 - >120 INCHES	2024-07-11 00:34:39.062	2024-07-11 00:34:39.062
1313	614	BLUE BEND LOOP TRAIL #614	TERRA	4.9976	092106	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.063	2024-07-11 00:34:39.063
1314	85402	SCHT - KELLY PINES	TERRA	1.7397	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.063	2024-07-11 00:34:39.063
1315	85401	SCHT - SEGMENT 1	TERRA	0.1703	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.063	2024-07-11 00:34:39.063
1316	615	SOUTH BOUNDARY TRAIL # 615	TERRA	4.6646	092106	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.063	2024-07-11 00:34:39.063
1317	206	COUNTY LINE TRAIL	TERRA	8.9446	092102	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.064	2024-07-11 00:34:39.064
1318	6047	WOOD CANYON RIDGE-BLACK GROVE	TERRA	0.0136	041556	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	12-20%	\N	2024-07-11 00:34:39.064	2024-07-11 00:34:39.064
1319	7024	NORTH CRYSTAL CREEK	TERRA	0.0003	041557	\N	NATIVE MATERIAL	321	\N	\N	8-10%	\N	2024-07-11 00:34:39.064	2024-07-11 00:34:39.064
1320	1339	JOHN DELLENBACK DUNE	TERRA	1.7834	061208	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.065	2024-07-11 00:34:39.065
1321	1384	CARTER DUNES TRAIL	TERRA	0.7	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.065	2024-07-11 00:34:39.065
1322	1383	OCEAN BEACH	TERRA	0.0511	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.065	2024-07-11 00:34:39.065
1323	1303	HART'S COVE	TERRA	2.58	061201	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.066	2024-07-11 00:34:39.066
1324	1387	DISCOVERY LOOP	TERRA	1.0178	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.066	2024-07-11 00:34:39.066
1325	1364.1	CAPE COVE	TERRA	0.3	061208	NOT ACCESSIBLE	ASPHALT	321	\N	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.066	2024-07-11 00:34:39.066
1326	1311	HEBO LAKE LOOP	TERRA	0.26	061201	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.066	2024-07-11 00:34:39.066
1327	1316	PIONEER HILL	TERRA	0.46	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.067	2024-07-11 00:34:39.067
1328	22574	LONG LAKE TRAIL	TERRA	0.0457	100522	\N	OTHER	321	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.067	2024-07-11 00:34:39.067
1329	22520	SALAMANDER RIDGE TRAIL	TERRA	0.0068	100522	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.067	2024-07-11 00:34:39.067
1330	WC8	FRANK JAMES	TERRA	6.535	0860	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.067	2024-07-11 00:34:39.067
1331	11E19-D30	CHROME TRAIL	TERRA	0.2924	051754	ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.068	2024-07-11 00:34:39.068
1332	11E49	BRIMSTONE-ATV TIE	TERRA	0.042	051754	\N	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.068	2024-07-11 00:34:39.068
1333	SNO-12E18	LOWER FORD POINT	SNOW	1.288	051754	\N	SNOW	\N	321	\N	5-8%	TW09 - >120 INCHES	2024-07-11 00:34:39.068	2024-07-11 00:34:39.068
1334	7XCWP1HA	WHITE PINE-HEART ATTACK	SNOW	1.02	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.069	2024-07-11 00:34:39.069
1335	22515	MILL CREEK TRAIL	TERRA	0.0286	100522	\N	IMPORTED COMPACTED MATERIAL	54321	\N	\N	8-10%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.069	2024-07-11 00:34:39.069
1336	08E09	WILLOW CREEK	TERRA	2	051753	ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.069	2024-07-11 00:34:39.069
1337	1362	 HORSE CREEK SOUTH	TERRA	4.063	061208	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.069	2024-07-11 00:34:39.069
1338	1378	DRIFT CREEK FALLS	TERRA	1.5	061201	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.07	2024-07-11 00:34:39.07
1339	1365	GIANT SPRUCE	TERRA	1.0973	061208	NOT ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.07	2024-07-11 00:34:39.07
1340	1308	OREGON COAST	TERRA	1.203	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.07	2024-07-11 00:34:39.07
1341	672-A	COMB CR ALTERNATE	TERRA	0.151	011506	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.07	2024-07-11 00:34:39.07
1342	740	JEFFERSON CREEK	TERRA	0.5921	011507	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.071	2024-07-11 00:34:39.071
1343	22537	INSTITUTE CREEK TRAIL	TERRA	0.0138	100522	\N	OTHER	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.071	2024-07-11 00:34:39.071
1344	7999A	CDT SEGMENT A	TERRA	11.43	040307	\N	NATIVE MATERIAL	321	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.072	2024-07-11 00:34:39.072
1345	34703	THAYER TO SALT LAKE	TERRA	4.9714	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.073	2024-07-11 00:34:39.073
1346	34701	SALT LAKE TO MITCHELL BAY	TERRA	0.0252	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.073	2024-07-11 00:34:39.073
1347	34529	PACK CREEK	TERRA	1	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.073	2024-07-11 00:34:39.073
1348	34702	DAVIDSON TO SALT LAKE	TERRA	2.9119	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.074	2024-07-11 00:34:39.074
1349	22536	RAINBOW FALLS TRAIL	TERRA	0.001	100522	\N	IMPORTED LOOSE MATERIAL	321	\N	\N	8-10%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.074	2024-07-11 00:34:39.074
1350	7XCWP8TL	WHITE PINE-THE LOOP	SNOW	1.72	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.075	2024-07-11 00:34:39.075
1351	SNO-21606	TWIN RIDGE SKI TRAIL	SNOW	3.7363	100521	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.076	2024-07-11 00:34:39.076
1352	7SM850	CD SOUTH SNOWMOBILE TRAIL	SNOW	7.84	040307	\N	NATIVE MATERIAL	\N	321	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.077	2024-07-11 00:34:39.077
1353	2252034	VIAL DIVIDE	TERRA	1.6	100522	\N	IMPORTED LOOSE MATERIAL	54321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.077	2024-07-11 00:34:39.077
1354	1364.2	CAPTAIN COOK	TERRA	0.6	061208	\N	ASPHALT	321	\N	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.077	2024-07-11 00:34:39.077
1355	1300	PIONEER INDIAN	TERRA	8	061201	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.077	2024-07-11 00:34:39.077
1356	1379	NIAGRA FALLS	TERRA	1.01	061201	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.078	2024-07-11 00:34:39.078
1357	22506	KUNK LAKE TRAIL	TERRA	0.0098	100522	\N	OTHER	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.078	2024-07-11 00:34:39.078
1358	1372	COOKS RIDGE	TERRA	2.482	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.079	2024-07-11 00:34:39.079
1359	1364	RESTLESS WATERS	TERRA	0.4524	061208	\N	ASPHALT	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.079	2024-07-11 00:34:39.079
1360	1376	KENTUCKY FALLS	TERRA	2.0479	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.079	2024-07-11 00:34:39.079
1361	1313	TIE TRAIL	TERRA	1.1678	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.079	2024-07-11 00:34:39.079
1362	1331	BLUEBILL	TERRA	1.2216	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.08	2024-07-11 00:34:39.08
1363	17516B	RIGHT RANCH SPUR B	TERRA	0.099	041707	\N	NATIVE MATERIAL	321	\N	\N	10-12%	\N	2024-07-11 00:34:39.08	2024-07-11 00:34:39.08
1364	17516A	RIGHT RANCH SPUR A	TERRA	0.089	041707	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.08	2024-07-11 00:34:39.08
1365	3670	MIDNIGHT LAKE TIE	TERRA	0.05	061805	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.081	2024-07-11 00:34:39.081
1366	7XCWP12HM	WHITE PINE-HALF MOON TIE-IN	SNOW	0.7	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.082	2024-07-11 00:34:39.082
1367	542054120	BURKES KNOB HILL	TERRA	1.43	100554	\N	IMPORTED LOOSE MATERIAL	54321	\N	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.082	2024-07-11 00:34:39.082
1368	13E58-C10	13E58-C10	TERRA	0.0188	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.083	2024-07-11 00:34:39.083
1369	16E79-C10	16E79-C10	TERRA	0.021	051757	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.084	2024-07-11 00:34:39.084
1370	14E33-C05	14E33-C05	TERRA	0.019	051757	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.084	2024-07-11 00:34:39.084
1371	13E24	SHORT CONNECTOR	TERRA	0.153	051756	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.084	2024-07-11 00:34:39.084
1372	1397	LILLY LAKE	TERRA	1.101	061208	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.084	2024-07-11 00:34:39.084
1591	0503	SYCAMORE	TERRA	1.6013	030905	\N	NAT - NATIVE MATERIAL	5321	\N	\N	5-8%	\N	2024-07-11 00:34:39.161	2024-07-11 00:34:39.161
1373	1329.8	BERRY CR. (CAPE MTN. TRAIL)	TERRA	2.1477	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.085	2024-07-11 00:34:39.085
1374	1329.4	PRINCES TASHA (CAPE MTN.TRAIL)	TERRA	0.8371	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.085	2024-07-11 00:34:39.085
1375	1359.1	CHIEF TSILTCOOS	TERRA	0.1136	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.085	2024-07-11 00:34:39.085
1376	1329.2	LOOKOUT LOOP (CAPE MTN. TRAIL)	TERRA	2.421	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.085	2024-07-11 00:34:39.085
1377	1329.6	HORSESHOE LN (CAPE MTN. TRAIL)	TERRA	1.2	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.086	2024-07-11 00:34:39.086
1378	1329.3	CAPE MTN. (CAPE MTN. TRAIL)	TERRA	0.87	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.086	2024-07-11 00:34:39.086
1379	1329.1	BERRY LANE (CAPE MTN TRAIL)	TERRA	0.9251	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.086	2024-07-11 00:34:39.086
1380	1337.1	WAXMYRTLE TRAIL ALTERNATE RTE	TERRA	0.0505	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.087	2024-07-11 00:34:39.087
1381	1368.1	 BAKER BEACH LOOP TRAIL	TERRA	3.784	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.087	2024-07-11 00:34:39.087
1382	WC7	JESSE JAMES	TERRA	0.249	0860	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.087	2024-07-11 00:34:39.087
1383	32383	WILDCAT RIVER TRAIL	TERRA	3.6	092205	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.087	2024-07-11 00:34:39.087
1384	003	CONTINENTAL DIVIDE NST	TERRA	21.79	030302	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.088	2024-07-11 00:34:39.088
1385	1098	RIGHT FORK INDIAN CANYON	TERRA	3.3414	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.088	2024-07-11 00:34:39.088
1386	31418	LOST POND	TERRA	0.0945	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.088	2024-07-11 00:34:39.088
1387	764	NORTH ELK CREEK	TERRA	0.197	021211	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.089	2024-07-11 00:34:39.089
1388	31462	TUCKERMAN CROSSOVER	TERRA	0.3	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.089	2024-07-11 00:34:39.089
1389	1802	HILL CLIMB	TERRA	0.11	021207	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	5-8%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.089	2024-07-11 00:34:39.089
1390	1801	SAND TRAP	TERRA	0.08	021207	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.09	2024-07-11 00:34:39.09
1391	SNO-401.B	DEER PEAK	SNOW	5.24	021203	NOT ACCESSIBLE	SNOW	\N	321	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.09	2024-07-11 00:34:39.09
1392	85407	SCHT - SEGMENT 7	TERRA	1.875	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.091	2024-07-11 00:34:39.091
1393	85334D	MINISTER FISHING	TERRA	0.5483	091903	NOT ACCESSIBLE	NATIVE MATERIAL	1	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.091	2024-07-11 00:34:39.091
1394	33718-SNO	TREADWELL DITCH SNO-TRAIL	SNOW	0.344	100533	\N	SNOW	\N	321	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.092	2024-07-11 00:34:39.092
1395	22500	NORTH WRANGELL TRAIL	TERRA	0.0065	100522	\N	OTHER	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.092	2024-07-11 00:34:39.092
1396	16E65-C50	BEAR VLY OHV - W SP	TERRA	0.008	051756	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.093	2024-07-11 00:34:39.093
1397	12E66-C30	12E66-C30	TERRA	0.019	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.093	2024-07-11 00:34:39.093
1398	17E15-C15	17E15-C15	TERRA	0.071	051757	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.093	2024-07-11 00:34:39.093
1399	16E76	MILLER MEADOW OHV SPUR	TERRA	0.7	051757	\N	NATIVE MATERIAL	654321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.094	2024-07-11 00:34:39.094
1400	85026E	TIMBERLINE ATV E LOOP	TERRA	0.2827	091902	\N	IMPORTED COMPACTED MATERIAL	54321	\N	\N	10-12%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.094	2024-07-11 00:34:39.094
1401	93	EAST FORK SAWMILL	TERRA	3.862	030303	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.094	2024-07-11 00:34:39.094
1402	0026	ASHLEY DRIVEWAY	TERRA	4.9962	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.095	2024-07-11 00:34:39.095
1403	54.2	GRAYS/TORREYS CONNECTOR	TERRA	0.43	021007	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.095	2024-07-11 00:34:39.095
1404	165	GIEFER CREEK	TERRA	0.5	011006	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.095	2024-07-11 00:34:39.095
1405	31857	BLUEBERRY RIDGE TRAIL	TERRA	3.1	092205	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.096	2024-07-11 00:34:39.096
1406	0106	GALLOWAY SPRING	TERRA	4.711	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.096	2024-07-11 00:34:39.096
1407	M24-4	HUNGERFORD HORSE MAPSEG 4	TERRA	2.234	090401	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.096	2024-07-11 00:34:39.096
1408	31406	HINCKS	TERRA	0.5699	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.097	2024-07-11 00:34:39.097
1409	818	FRONTIER CREEK	TERRA	1.757	021405	\N	NATIVE MATERIAL	21	\N	\N	12-20%	\N	2024-07-11 00:34:39.097	2024-07-11 00:34:39.097
1410	16E50	PROSSER HILL MOTORCYCLE	TERRA	7.5	051757	\N	NATIVE MATERIAL	4321	\N	\N	20-30%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.097	2024-07-11 00:34:39.097
1411	96739	PAUGUS MILL SNOMO	SNOW	0.6142	092205	NOT ACCESSIBLE	SNOW	\N	321	\N	8-10%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.098	2024-07-11 00:34:39.098
1412	1095	RIGHT FORK LAKE CANYON	TERRA	1.877	040104	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.098	2024-07-11 00:34:39.098
1413	4084W	SIX LAKES	TERRA	1.98	040304	\N	NATIVE MATERIAL	21	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.098	2024-07-11 00:34:39.098
1414	54750	SARKAR CANOE ROUTE	WATER	2.23	100554	ACCESSIBLE	WATER	\N	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.098	2024-07-11 00:34:39.098
1415	1339.1	JOHN DELLENBACK DUNES	TERRA	0.2414	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.099	2024-07-11 00:34:39.099
1416	1330.2	LAGOON TRAIL	TERRA	0.0479	061208	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.099	2024-07-11 00:34:39.099
1417	1344A	SOUTH JETTY OHV TRAIL A	TERRA	0.381	061208	\N	NATIVE MATERIAL	654321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.099	2024-07-11 00:34:39.099
1418	1329.7	BLUE HORIZON (CAPE MTN. TRAIL)	TERRA	0.8484	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.099	2024-07-11 00:34:39.099
1419	54717B	GRAVELLY CREEK SPUR B	TERRA	0.0292	100554	\N	IMPORTED COMPACTED MATERIAL	321	\N	\N	10-12%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.1	2024-07-11 00:34:39.1
1420	1329.9	WAPATI  (CAPE MTN. TRAIL)	TERRA	1.8464	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.1	2024-07-11 00:34:39.1
1421	1329.5	SCURVY RIDGE (CAPE MTN. TRAIL)	TERRA	2.4724	061208	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.1	2024-07-11 00:34:39.1
1422	1386.1	AMANDAS LOOP TRAIL	TERRA	0.3278	061208	ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.101	2024-07-11 00:34:39.101
1423	1343A	BULL RUN OHV TRAIL A	TERRA	0.52	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.101	2024-07-11 00:34:39.101
1424	1344C	SOUTH JETTY OHV TRAIL C	TERRA	0.5	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.101	2024-07-11 00:34:39.101
1425	13E23	13E23	TERRA	0.411	051756	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.101	2024-07-11 00:34:39.101
1426	85026C	TIMBERLINE ATV C LOOP	TERRA	0.321	091902	\N	IMPORTED COMPACTED MATERIAL	54321	\N	\N	10-12%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.104	2024-07-11 00:34:39.104
1427	31386	EDMANDS COL CUT-OFF	TERRA	0.4607	092202	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.104	2024-07-11 00:34:39.104
1428	215	BISHOP KNOB LOOP TRAIL	TERRA	2.2348	092102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.105	2024-07-11 00:34:39.105
1429	31449A	SCAR "LOOP" SPUR A	TERRA	0.11	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.105	2024-07-11 00:34:39.105
1430	32155	BLACK POND	TERRA	0.8	092204	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.105	2024-07-11 00:34:39.105
1431	54776B	BEAVER FALLS SPUR B	TERRA	0.2305	100554	ACCESSIBLE	OTHER	321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.106	2024-07-11 00:34:39.106
1432	10E25	DEER CREEK MC	TERRA	7.845	051753	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:39.107	2024-07-11 00:34:39.107
1433	512024300	MAYBESO ROAD	TERRA	0.326	100551	\N	IMPORTED LOOSE MATERIAL	54321	\N	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.107	2024-07-11 00:34:39.107
1434	6062W	LAKE CREEK TRAIL CUTOFF	TERRA	1.4	040306	\N	NATIVE MATERIAL	21	\N	\N	5-8%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.107	2024-07-11 00:34:39.107
1435	16E69	PROSSER CREEK OHV LOOP	TERRA	1.1	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.108	2024-07-11 00:34:39.108
1436	11E19	BRIMSTONE	TERRA	1.104	051754	\N	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.109	2024-07-11 00:34:39.109
1437	34492	BEAVER TO HASSELBORG	TERRA	0.2716	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.109	2024-07-11 00:34:39.109
1438	34517	MOLE HARBOR TO ALEXANDER	TERRA	2.514	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.109	2024-07-11 00:34:39.109
1439	34490	HASSELBORG RIVER	TERRA	1	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.11	2024-07-11 00:34:39.11
1440	34470	DISTIN TO THAYER	TERRA	0.3534	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.11	2024-07-11 00:34:39.11
1441	34446	ADMIRALTY COVE TO N. YOUNG LK	TERRA	3.743	100534	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.11	2024-07-11 00:34:39.11
1442	85414	SCHT - DYNAMITE	TERRA	0.2585	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.11	2024-07-11 00:34:39.11
1443	M24-5	HUNGERFORD HORSE MAPSEG 5	TERRA	2.814	090401	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.111	2024-07-11 00:34:39.111
1444	97174A	NOTCHWAY TRAIL XC SPUR	SNOW	0.1595	092204	\N	SNOW	\N	21	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.111	2024-07-11 00:34:39.111
1445	31454	SPHINX	TERRA	0.9156	092202	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.111	2024-07-11 00:34:39.111
1446	85413	SCHT - SEGMENT 13	TERRA	2.7969	091902	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.112	2024-07-11 00:34:39.112
1447	H56	MI SHORE TO SHORE HORSE&HIKE	TERRA	0.25	090406	\N	IMPORTED LOOSE MATERIAL	321	\N	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.113	2024-07-11 00:34:39.113
1448	7XCWP4PL	WHITE PINE-POWER LINE	SNOW	0.63	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.113	2024-07-11 00:34:39.113
1449	7XCWP3H	WHITE PINE-HUMMER	SNOW	2.34	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.113	2024-07-11 00:34:39.113
1450	12E67-C10	12E67-C10	TERRA	0.063	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.114	2024-07-11 00:34:39.114
1451	13E20	13E20	TERRA	0.023	051756	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.114	2024-07-11 00:34:39.114
1452	12E44-C10	12E44-C10	TERRA	0.241	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.114	2024-07-11 00:34:39.114
1453	17E11	17E11	TERRA	0.871	051757	\N	NATIVE MATERIAL	6321	\N	\N	5-8%	\N	2024-07-11 00:34:39.115	2024-07-11 00:34:39.115
1454	16E67	PROSSER CREEK EAST OHV	TERRA	0.6	051757	\N	NATIVE MATERIAL	654321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.115	2024-07-11 00:34:39.115
1455	11E54	OMEGA OVERLOOK MC TRAIL	TERRA	4.5	051753	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:39.116	2024-07-11 00:34:39.116
1456	16E55	HOBART 1 OHV	TERRA	0.7	051757	\N	NATIVE MATERIAL	6321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.116	2024-07-11 00:34:39.116
1457	14E33-C10	14E33-C10	TERRA	0.019	051757	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.116	2024-07-11 00:34:39.116
1458	22401	BURNETT INLET PORTAGE TRAIL	TERRA	0.225	100522	\N	IMPORTED LOOSE MATERIAL	54321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.116	2024-07-11 00:34:39.117
1459	4110	SHERIDAN CREEK	TERRA	2.446	040304	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.117	2024-07-11 00:34:39.117
1460	12E07-C10	BLACK VISTA OHV TRAIL	TERRA	0.3068	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.117	2024-07-11 00:34:39.117
1461	14E06-C05	14E06-C05	TERRA	0.007	051757	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.118	2024-07-11 00:34:39.118
1462	16E53	BORROW PIT 2 OHV	TERRA	0.7	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.118	2024-07-11 00:34:39.118
1463	9.6	STRAWBERRY LAKE	TERRA	0.311	021008	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.118	2024-07-11 00:34:39.118
1464	13E10-C42	13E10-C42	TERRA	0.068	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.119	2024-07-11 00:34:39.119
1465	14E03	14E03	TERRA	0.151	051756	\N	NATIVE MATERIAL	6321	\N	\N	5-8%	\N	2024-07-11 00:34:39.119	2024-07-11 00:34:39.119
1466	13E10-C36	13E10-C36	TERRA	0.171	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.119	2024-07-11 00:34:39.119
1467	16E34	BILLY HILLS OHV	TERRA	1.532	051757	\N	NATIVE MATERIAL	654321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.12	2024-07-11 00:34:39.12
1468	11E03-C27	11E03-C27	TERRA	0.035	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.12	2024-07-11 00:34:39.12
1469	16E41	SAGEHEN OHV TIE 1	TERRA	0.56	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.12	2024-07-11 00:34:39.12
1470	16E31	DONNER CAMP	TERRA	0.4	051757	ACCESSIBLE	IMPORTED COMPACTED MATERIAL	321	\N	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.12	2024-07-11 00:34:39.12
1471	11E55-E20	11E55-E20	TERRA	0.062	051753	\N	NATIVE MATERIAL	4321	\N	\N	5-8%	\N	2024-07-11 00:34:39.121	2024-07-11 00:34:39.121
1472	808	DUNOIR TRAIL	TERRA	2.116	021405	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.121	2024-07-11 00:34:39.121
1473	316	PTARMIGAN LAKE TR	TERRA	3.6777	100430	\N	NATIVE MATERIAL	1	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.122	2024-07-11 00:34:39.122
1474	11E67-C25	11E67-C25	TERRA	0.019	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.123	2024-07-11 00:34:39.123
1475	12E33-C05	12E33-C05	TERRA	0.021	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.123	2024-07-11 00:34:39.123
1476	1352	COAST GUARD NORTH OHV TRAIL	TERRA	5.5	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.123	2024-07-11 00:34:39.123
1477	1385A	INCINERATOR OHV TRAIL A	TERRA	0.3	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.124	2024-07-11 00:34:39.124
1592	0166	SHORT CUT	TERRA	1.5055	030905	\N	NAT - NATIVE MATERIAL	21	\N	\N	12-20%	\N	2024-07-11 00:34:39.162	2024-07-11 00:34:39.162
1478	0032	SINK RIDGE	TERRA	4.219	040102	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.124	2024-07-11 00:34:39.124
1479	32416A	WONALANCET RANGE TRAIL CUTOFF	TERRA	0.4	092205	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.124	2024-07-11 00:34:39.124
1480	1344E	SOUTH JETTY OHV TRAIL E	TERRA	0.17	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.124	2024-07-11 00:34:39.124
1481	13E10-C34	13E10-C34	TERRA	0.0192	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.125	2024-07-11 00:34:39.125
1482	1161	DRY FORK NATURE	TERRA	0.467	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.127	2024-07-11 00:34:39.127
1483	0133	READER BASIN	TERRA	0.829	040102	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.127	2024-07-11 00:34:39.127
1484	0071	ANDERSON CREEK ATV	TERRA	0.033	040102	\N	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.127	2024-07-11 00:34:39.127
1485	SNO-1160	DON HATCH MEMORIAL SNOWMOBILE	SNOW	1.096	040101	\N	SNOW	\N	321	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.128	2024-07-11 00:34:39.128
1486	1344N	FRONTIER OHV TRAIL	TERRA	0.19	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW01 - <12 INCHES	2024-07-11 00:34:39.128	2024-07-11 00:34:39.128
1487	1385B	RED BUGGY OHV TRAIL	TERRA	0.41	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.128	2024-07-11 00:34:39.128
1488	1344S	WOAHINK OHV TRAIL	TERRA	0.138	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.128	2024-07-11 00:34:39.128
1489	1358	CHAPMANS OHV TRAIL	TERRA	0.736	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.129	2024-07-11 00:34:39.129
1490	1355	SAUNDERS LAKE OHV TRAIL	TERRA	0.798	061208	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.129	2024-07-11 00:34:39.129
1491	1344D	LOWER CLEAWOX OHV TRAIL	TERRA	0.3	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.129	2024-07-11 00:34:39.129
1492	306.1	BATEY BOULD LOOP	TERRA	1.9	062103	NOT ACCESSIBLE	NATIVE MATERIAL	4321	\N	\N	10-12%	\N	2024-07-11 00:34:39.13	2024-07-11 00:34:39.13
1493	SNO-12E20	GOLD LAKE RAMP	SNOW	0.5	051753	\N	SNOW	\N	321	\N	8-10%	TW09 - >120 INCHES	2024-07-11 00:34:39.13	2024-07-11 00:34:39.13
1494	05202	ELLIS	TERRA	1.85	030305	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.13	2024-07-11 00:34:39.13
1495	159	TWENTY-FIVE MILE CREEK	TERRA	2.18	011006	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.131	2024-07-11 00:34:39.131
1496	984	HOURGLASS	TERRA	4.37	021005	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.131	2024-07-11 00:34:39.131
1497	H58-3	MEADOWS NORTH	TERRA	0.509	090405	\N	NATIVE MATERIAL	54321	\N	\N	0-5%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.132	2024-07-11 00:34:39.132
1498	05010	SANDY ARROYO	TERRA	0.539	030305	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.132	2024-07-11 00:34:39.132
1499	97507	OWLS CLIFF SNOMO	SNOW	2.5892	092205	NOT ACCESSIBLE	SNOW	\N	321	\N	10-12%	\N	2024-07-11 00:34:39.132	2024-07-11 00:34:39.132
1500	0127	LAKE MOUNTAIN	TERRA	5.893	040102	\N	NATIVE MATERIAL	321	\N	\N	5-8%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.132	2024-07-11 00:34:39.132
1501	SNO-1159	ELK PARK X-C SKI	SNOW	1.9656	040101	\N	NATIVE MATERIAL	\N	21	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.133	2024-07-11 00:34:39.133
1502	31415	LEDGE	TERRA	0.3	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.133	2024-07-11 00:34:39.133
1503	746	N. FORK DEADMAN	TERRA	0.0025	011507	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.133	2024-07-11 00:34:39.133
1504	534	SNOWMOBILE TRAIL M	SNOW	2	011506	\N	SNOW	\N	321	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.134	2024-07-11 00:34:39.134
1505	517	SNOWMOBILE SMALL D	SNOW	0.5	011507	\N	SNOW	\N	321	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.134	2024-07-11 00:34:39.134
1506	J9214	CORRAL CREEK	TERRA	0.47	011506	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.134	2024-07-11 00:34:39.134
1507	H8	OSCODA TO OASIS	TERRA	3.863	090406	\N	NATIVE MATERIAL	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.134	2024-07-11 00:34:39.135
1508	12E67-C18	12E67-C18	TERRA	0.02	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.135	2024-07-11 00:34:39.135
1509	1382.1	CUMMINS CREEK LOOP TRAIL	TERRA	1.5	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.135	2024-07-11 00:34:39.135
1510	1386	AMANDA'S	TERRA	1.64	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	20-30%	\N	2024-07-11 00:34:39.136	2024-07-11 00:34:39.136
1511	31424	KILKENNY RIDGE	TERRA	20.6	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.136	2024-07-11 00:34:39.136
1512	4500	WILDMARE HORSE TRAIL	TERRA	0.7814	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.137	2024-07-11 00:34:39.137
1513	17724A	CHOKE CHERRY TURNOUT	TERRA	0.14	041707	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.138	2024-07-11 00:34:39.138
1514	J15975	THORSEN POND	TERRA	0.746	011506	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.138	2024-07-11 00:34:39.138
1515	J8896	UPPER FLAGSTAFF	TERRA	0.007	011506	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.138	2024-07-11 00:34:39.138
1516	628	DAISY ATV	TERRA	1.965	011506	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	5-8%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.139	2024-07-11 00:34:39.139
1517	WC9	BILLY THE KID	TERRA	0.084	0860	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.139	2024-07-11 00:34:39.139
1518	WC10	MATT DILLON	TERRA	0.334	0860	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	5-8%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.139	2024-07-11 00:34:39.139
1519	SNO1-583	GRASSY MOUNTAIN	SNOW	5.4	011511	NOT ACCESSIBLE	SNOW	\N	321	\N	12-20%	TW05 - 36-48 INCHES	2024-07-11 00:34:39.139	2024-07-11 00:34:39.139
1520	05150	CANONCITO	TERRA	2.449	030305	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.14	2024-07-11 00:34:39.14
1521	J15985	LUCKY DOLLAR	TERRA	0.388	011506	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.14	2024-07-11 00:34:39.14
1522	31404	DIRETTISSIMA	TERRA	1	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.14	2024-07-11 00:34:39.14
1523	32245	ORE HILL	TERRA	3.4	092204	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.141	2024-07-11 00:34:39.141
1524	31380	CAMEL	TERRA	0.7	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	8-10%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.141	2024-07-11 00:34:39.141
1525	17EV130	TAMARACK M/C	TERRA	0.809	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.141	2024-07-11 00:34:39.141
1526	J1043	FLAGSTAFF JEEP	TERRA	0.126	011506	ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.141	2024-07-11 00:34:39.141
1527	18EV256	PINECREST OHV -4X4	TERRA	0.808	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.142	2024-07-11 00:34:39.142
1528	19EV43	PACIFIC VALLEY OHV-4X4	TERRA	1.514	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.142	2024-07-11 00:34:39.142
1529	16EV112	TWAIN HARTE OHV-M/C	TERRA	0.174	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.142	2024-07-11 00:34:39.142
1530	14E01	14E01	TERRA	0.05	051756	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.142	2024-07-11 00:34:39.142
1531	11E10-C20	11E10-C20	TERRA	0.5981	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.143	2024-07-11 00:34:39.143
1532	19E00C	SCOTTS LAKE TRAIL	TERRA	1.85	0519	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.143	2024-07-11 00:34:39.143
1533	31433	MT CLAY LOOP	TERRA	1.012	092202	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.143	2024-07-11 00:34:39.143
1534	M145	WEST SHORE SMT DNR191	SNOW	0.801	090401	\N	SNOW	\N	321	\N	5-8%	TW09 - >120 INCHES	2024-07-11 00:34:39.144	2024-07-11 00:34:39.144
1535	512156000	 MCKENZIE 2156000 ROAD	TERRA	4.35	100551	\N	IMPORTED LOOSE MATERIAL	54321	\N	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.144	2024-07-11 00:34:39.144
1536	317591	TWIN LAKES ROAD	TERRA	0.0946	100531	\N	IMPORTED LOOSE MATERIAL	654321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.144	2024-07-11 00:34:39.144
1537	T6793-B	NFST-6973-B	TERRA	0.51	090706	NOT ACCESSIBLE	NATIVE MATERIAL	54321	\N	\N	0-5%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.145	2024-07-11 00:34:39.145
1538	WC1	JOHN WAYNE	TERRA	0.091	0860	NOT ACCESSIBLE	NATIVE MATERIAL	21	\N	\N	8-10%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.145	2024-07-11 00:34:39.145
1539	7XCWP13SCC	WHITE PINE-SWEENY CK CUTOVER	SNOW	0.78	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.145	2024-07-11 00:34:39.145
1540	17687	CORTA	TERRA	0.414	041707	\N	NATIVE MATERIAL	321	\N	\N	12-20%	\N	2024-07-11 00:34:39.146	2024-07-11 00:34:39.146
1541	17E14	NORTH VERDI OHV SPUR	TERRA	1.1	051757	\N	NATIVE MATERIAL	4321	\N	\N	12-20%	TW09 - >120 INCHES	2024-07-11 00:34:39.146	2024-07-11 00:34:39.146
1542	13E10-C38	13E10-C38	TERRA	0.1292	051753	\N	NATIVE MATERIAL	321	\N	\N	5-8%	\N	2024-07-11 00:34:39.146	2024-07-11 00:34:39.146
1543	17EV478	\N	TERRA	0.253	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.147	2024-07-11 00:34:39.147
1544	17EV472	\N	TERRA	0.391	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.147	2024-07-11 00:34:39.147
1545	20EV200	\N	TERRA	0.343	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.147	2024-07-11 00:34:39.147
1546	16DC400	\N	TERRA	0.05	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.147	2024-07-11 00:34:39.147
1547	32181	GORDON POND	TERRA	3.4591	092204	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.148	2024-07-11 00:34:39.148
1548	16EV115	TWAINHARTE/CRNDLL PK OHV-M/C	TERRA	2.399	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.148	2024-07-11 00:34:39.148
1549	18E211	\N	TERRA	0.899	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.148	2024-07-11 00:34:39.148
1550	18E05A	MUD LAKE	TERRA	1.573	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.148	2024-07-11 00:34:39.148
1551	18EV272	CHERRY LK NO OHV-ATV	TERRA	1.138	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.149	2024-07-11 00:34:39.149
1552	1466	DUNCE CREEK OHV	TERRA	0.72	010402	\N	NAT - NATIVE MATERIAL	54321	\N	\N	5-8%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.149	2024-07-11 00:34:39.149
1553	19EV105	CHERRY LAKE NO OHV-ATV	TERRA	1.084	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.149	2024-07-11 00:34:39.149
1554	17EV182	BUCKHORN PK OHV-ATV	TERRA	0.059	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.149	2024-07-11 00:34:39.149
1555	20E07	SEVEN PINES	TERRA	5.753	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.15	2024-07-11 00:34:39.15
1556	18E47	LIONS CREEK	TERRA	1.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.15	2024-07-11 00:34:39.15
1557	19E27	MUD LAKE	TERRA	1.746	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.15	2024-07-11 00:34:39.15
1558	18E41	OSBORN CREST	TERRA	0.964	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.15	2024-07-11 00:34:39.15
1559	18E42	WOLFEBORO TO SLICK ROCK	TERRA	6	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.151	2024-07-11 00:34:39.151
1560	16E13	FIVE LAKES	TERRA	0.3	051757	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.151	2024-07-11 00:34:39.151
1561	1343	COAST GUARD - SOUTH OHV TRAIL	TERRA	2.764	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.151	2024-07-11 00:34:39.151
1562	1381A	430 WEST OHV TRAIL	TERRA	0.068	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.152	2024-07-11 00:34:39.152
1563	1342	BARK OHV TRAIL	TERRA	0.032	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.152	2024-07-11 00:34:39.152
1564	1318	BREACH OHV TRAIL	TERRA	0.5	061208	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.152	2024-07-11 00:34:39.152
1565	1380	DRIFTWOOD II OHV TRAIL	TERRA	0.753	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.152	2024-07-11 00:34:39.152
1566	1381	430 OHV TRAIL	TERRA	1.479	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.153	2024-07-11 00:34:39.153
1567	1341	HAUSER OHV TRAIL	TERRA	0.02	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.153	2024-07-11 00:34:39.153
1568	1309	CLAM BED	TERRA	0.4	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.153	2024-07-11 00:34:39.153
1569	97137	ATWELL HILL	TERRA	1.7	092204	\N	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.154	2024-07-11 00:34:39.154
1570	7XCWP11KP	WHITE PINE-KELLY PARK LOOP	SNOW	2.84	040307	\N	SNOW	\N	21	\N	0-5%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.154	2024-07-11 00:34:39.154
1571	05542	542 ROAD	TERRA	0.3	030305	\N	NATIVE MATERIAL	54321	\N	\N	5-8%	\N	2024-07-11 00:34:39.154	2024-07-11 00:34:39.154
1572	05272	BURIED CABLE	TERRA	0.263	030305	\N	NATIVE MATERIAL	321	\N	\N	8-10%	TW02 - 12-18 INCHES	2024-07-11 00:34:39.155	2024-07-11 00:34:39.155
1573	31390	GLEN ELLIS	TERRA	0.1931	092202	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.156	2024-07-11 00:34:39.156
1574	1119	DIVIDE LAKE	TERRA	1.5	040104	\N	NATIVE MATERIAL	21	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.156	2024-07-11 00:34:39.156
1575	12E66-C34	SNAKE LAKE DISPERSED CAMP	TERRA	0.039	051753	\N	NATIVE MATERIAL	654321	\N	\N	5-8%	\N	2024-07-11 00:34:39.157	2024-07-11 00:34:39.157
1576	1314	10 MILE OHV TRAIL	TERRA	0.5	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	\N	2024-07-11 00:34:39.157	2024-07-11 00:34:39.157
1577	J8886	YANKEE JIM	TERRA	1.89	011506	\N	NATIVE MATERIAL	654321	\N	\N	0-5%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.157	2024-07-11 00:34:39.157
1578	1805-T1	SKYLINE 1	TERRA	0.569	011512	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.158	2024-07-11 00:34:39.158
1579	17EV465	\N	TERRA	0.776	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.158	2024-07-11 00:34:39.158
1580	15EV43G	\N	TERRA	0.506	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.158	2024-07-11 00:34:39.158
1581	18DC406	\N	TERRA	0.022	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.159	2024-07-11 00:34:39.159
1582	17EV51	\N	TERRA	3.6605	051651	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.159	2024-07-11 00:34:39.159
1583	14E16	\N	TERRA	0.214	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.159	2024-07-11 00:34:39.159
1584	14E13	P13	TERRA	2.6291	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.159	2024-07-11 00:34:39.159
1585	14E19	\N	TERRA	0.776	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.16	2024-07-11 00:34:39.16
1586	14E18	\N	TERRA	0.584	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.16	2024-07-11 00:34:39.16
1587	14E06	ARNOLD RIM TRAIL	TERRA	8.591	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.16	2024-07-11 00:34:39.16
1588	17EV183	BUCKHORN PK OHV-ATV	TERRA	0.639	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.16	2024-07-11 00:34:39.16
1589	18EV269	JAWBONE RIDGE OHV-ATV	TERRA	0.156	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.161	2024-07-11 00:34:39.161
1590	636	TIMBER MESA	TERRA	7.253	030107	\N	NAT - NATIVE MATERIAL	N/A	N/A	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.161	2024-07-11 00:34:39.161
1593	9854	SEVEN MILE GULCH	TERRA	3.1436	030903	\N	NAT - NATIVE MATERIAL	5321	\N	\N	12-20%	\N	2024-07-11 00:34:39.162	2024-07-11 00:34:39.162
1594	643	SOUTH ALBANY PEAK	TERRA	1.1	020609	\N	NAT - NATIVE MATERIAL	54321	\N	\N	12-20%	\N	2024-07-11 00:34:39.162	2024-07-11 00:34:39.162
1595	129A	LITTLE TIZER CREEK TIE	TERRA	0.266	011512	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	12-20%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.163	2024-07-11 00:34:39.163
1596	SNO4-09B	JEFFERSON ROAD SNOMO	SNOW	3.7	011514	\N	NATIVE MATERIAL	\N	321	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.163	2024-07-11 00:34:39.163
1597	SNO4-10	SAUERKRAUT BUFFALO LOOP SNOMO	SNOW	9.25	011514	\N	SNOW	\N	321	\N	12-20%	TW07 - 60-96 INCHES	2024-07-11 00:34:39.163	2024-07-11 00:34:39.163
1598	1344	SOUTH JETTY OHV TRAIL	TERRA	1.356	061208	NOT ACCESSIBLE	NATIVE MATERIAL	654321	\N	\N	0-5%	TW09 - >120 INCHES	2024-07-11 00:34:39.164	2024-07-11 00:34:39.164
1599	122	SOUTH GRASSY MT	TERRA	1.03	011511	\N	NATIVE MATERIAL	54321	\N	\N	12-20%	TW06 - 48-60 INCHES	2024-07-11 00:34:39.164	2024-07-11 00:34:39.164
1600	528	SNOWMOBILE TRAIL K	SNOW	3.3	011506	\N	SNOW	\N	321	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.164	2024-07-11 00:34:39.164
1601	438	LANDERS FORK TRAIL	TERRA	12.7144	011514	\N	NATIVE MATERIAL	21	\N	\N	8-10%	TW03 - 18-24 INCHES	2024-07-11 00:34:39.164	2024-07-11 00:34:39.164
1602	544	SNOWMOBILE TRAIL T	SNOW	0.7	011507	\N	SNOW	\N	321	\N	12-20%	TW08 - 96-120 INCHES	2024-07-11 00:34:39.165	2024-07-11 00:34:39.165
1603	20E08	EAGLE CREEK	TERRA	8.801	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.165	2024-07-11 00:34:39.165
1604	19E21	LAKE VALLEY	TERRA	4.759	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.165	2024-07-11 00:34:39.165
1605	20E06	WOODS GULCH/JENKINS CANYON	TERRA	5.209	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.166	2024-07-11 00:34:39.166
1606	19E90	GROUNDHOG MEADOW	TERRA	0.371	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.166	2024-07-11 00:34:39.166
1607	18E25	BEE GULCH	TERRA	0.5	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.166	2024-07-11 00:34:39.166
1608	18EV274	CHERRY LAKE NO OHV-ATV	TERRA	1.507	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.166	2024-07-11 00:34:39.166
1609	14E24	\N	TERRA	0.249	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.166	2024-07-11 00:34:39.166
1610	17EV184	BUCKHORN PK OHV-M/C	TERRA	0.6	051654	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.167	2024-07-11 00:34:39.167
1611	18E215	\N	TERRA	1.573	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.167	2024-07-11 00:34:39.167
1612	14EV15	S14	TERRA	1.367	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.167	2024-07-11 00:34:39.167
1613	14E21	\N	TERRA	0.121	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.167	2024-07-11 00:34:39.167
1614	14E15	\N	TERRA	0.184	051652	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.168	2024-07-11 00:34:39.168
1615	18DC525	\N	TERRA	0.055	051653	N/A	N/A	N/A	N/A	\N	N/A	N/A	2024-07-11 00:34:39.168	2024-07-11 00:34:39.168
1616	1388	SUMMIT LOOP	TERRA	0.9	061208	NOT ACCESSIBLE	NATIVE MATERIAL	321	\N	\N	10-12%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.168	2024-07-11 00:34:39.168
1617	1368	BAKER BEACH	TERRA	0.357	061208	\N	NATIVE MATERIAL	321	\N	\N	0-5%	TW04 - 24-36 INCHES	2024-07-11 00:34:39.169	2024-07-11 00:34:39.169
1618	1852-T2	UPPER HOPE GULCH	TERRA	1.607	011512	\N	\N	321	\N	\N	0-5%	\N	2024-07-11 00:34:39.169	2024-07-11 00:34:39.169
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: mfoster
--

COPY public."Users" (id, username, email, "passwordHash", "createdAt", "updatedAt", "profilePicture", "coverPhoto", "profilePhoto") FROM stdin;
1	testuser	\N	$2b$10$3KOp/UHPjJ3ln.G3rXc/Luk9buKcdZtmonpCqNg5cO6HoKamQ.57C	2024-07-08 12:37:33.705-07	2024-07-08 12:37:33.705-07	\N	\N	\N
2	testuser	\N	$2b$10$pWpQqDPp4eSJkafcRMERt.m.DtMkJGqf.NK3g3OZYNuL2GnpsKiKG	2024-07-08 12:47:31.304-07	2024-07-08 12:47:31.304-07	\N	\N	\N
3	testuser	\N	$2b$10$Rd03HACXFeL7CVz8bdk8LuWf1DVhH/gY7hbSzf.SlTEWhXYXkul42	2024-07-08 15:15:38.856-07	2024-07-08 15:15:38.856-07	\N	\N	\N
4	testuser	\N	$2b$10$PgxSAIY0gTKGG5eIzg4EwONsTbAShPMpF8rueNhMnwgg0Ls8bfu3S	2024-07-08 15:20:13.469-07	2024-07-08 15:20:13.469-07	\N	\N	\N
5	testuser	\N	$2b$10$jrUnRodCgDpBF0hbzUOlpuPPcVQMZp7Ak5jkVn6hTzQK0GcUXQJ.u	2024-07-08 16:22:45.447-07	2024-07-08 16:22:45.447-07	\N	\N	\N
6	mfoster	\N	$2b$10$zMFzesvy4jHVTXEhhgnjgup00gFlR31yYhTAoizTNSue7INhdYw9y	2024-07-08 16:29:24.448-07	2024-07-08 16:29:24.448-07	\N	\N	\N
\.


--
-- Name: campsitesIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."campsitesIdSeq"', 4508, true);


--
-- Name: commentsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."commentsIdSeq"', 6, true);


--
-- Name: forestsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."forestsIdSeq"', 20, true);


--
-- Name: itinerariesIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."itinerariesIdSeq"', 1, false);


--
-- Name: itineraryItemsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."itineraryItemsIdSeq"', 1, false);


--
-- Name: photosIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."photosIdSeq"', 1, false);


--
-- Name: postsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."postsIdSeq"', 1, false);


--
-- Name: reviewsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."reviewsIdSeq"', 1, true);


--
-- Name: trailsIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."trailsIdSeq"', 1618, true);


--
-- Name: usersIdSeq; Type: SEQUENCE SET; Schema: public; Owner: mfoster
--

SELECT pg_catalog.setval('public."usersIdSeq"', 6, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Campsites campsitesFacilityIdKey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Campsites"
    ADD CONSTRAINT "campsitesFacilityIdKey" UNIQUE ("facilityId");


--
-- Name: Campsites campsitesPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Campsites"
    ADD CONSTRAINT "campsitesPkey" PRIMARY KEY (id);


--
-- Name: Comments commentsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "commentsPkey" PRIMARY KEY (id);


--
-- Name: Forests forestsAdminForestIdKey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Forests"
    ADD CONSTRAINT "forestsAdminForestIdKey" UNIQUE ("adminForestId");


--
-- Name: Forests forestsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Forests"
    ADD CONSTRAINT "forestsPkey" PRIMARY KEY (id);


--
-- Name: Itineraries itinerariesPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Itineraries"
    ADD CONSTRAINT "itinerariesPkey" PRIMARY KEY (id);


--
-- Name: ItineraryItems itineraryItemsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."ItineraryItems"
    ADD CONSTRAINT "itineraryItemsPkey" PRIMARY KEY (id);


--
-- Name: Photos photosPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Photos"
    ADD CONSTRAINT "photosPkey" PRIMARY KEY (id);


--
-- Name: Posts postsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "postsPkey" PRIMARY KEY (id);


--
-- Name: Reviews reviewsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "reviewsPkey" PRIMARY KEY (id);


--
-- Name: Trails trailsPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Trails"
    ADD CONSTRAINT "trailsPkey" PRIMARY KEY (id);


--
-- Name: Trails trailsTrailIdKey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Trails"
    ADD CONSTRAINT "trailsTrailIdKey" UNIQUE ("trailId");


--
-- Name: Users usersPkey; Type: CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "usersPkey" PRIMARY KEY (id);


--
-- Name: Comments commentsUserIdFkey; Type: FK CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "commentsUserIdFkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Posts postsUserIdFkey; Type: FK CONSTRAINT; Schema: public; Owner: mfoster
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "postsUserIdFkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

