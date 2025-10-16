-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- ==============================
-- PROFILES TABLE POLICIES
-- ==============================

-- Users can read their own profile
CREATE POLICY profiles_read_own
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY profiles_update_own
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Admins/managers/owners can read all profiles
CREATE POLICY profiles_read_admins
ON public.profiles
FOR SELECT
USING (auth.role() IN ('admin', 'manager', 'owner'));

-- Admins/managers/owners can update all profiles
CREATE POLICY profiles_update_admins
ON public.profiles
FOR UPDATE
USING (auth.role() IN ('admin', 'manager', 'owner'));

-- ==============================
-- EMPLOYEES TABLE POLICIES
-- ==============================

-- Admins/managers/owners can read all employees
CREATE POLICY employees_read_admins
ON public.employees
FOR SELECT
USING (auth.role() IN ('admin', 'manager', 'owner'));

-- Admins/managers/owners can update employees
CREATE POLICY employees_update_admins
ON public.employees
FOR UPDATE
USING (auth.role() IN ('admin', 'manager', 'owner'));
