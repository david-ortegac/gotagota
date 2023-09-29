@extends('layouts.app')

@section('template_title')
    {{ $employee->name ?? "{{ __('Show') Employee" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Employee</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('employees.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Route Id:</strong>
                            {{ $employee->route_id }}
                        </div>
                        <div class="form-group">
                            <strong>Name:</strong>
                            {{ $employee->name }}
                        </div>
                        <div class="form-group">
                            <strong>Last Name:</strong>
                            {{ $employee->last_name }}
                        </div>
                        <div class="form-group">
                            <strong>Phone:</strong>
                            {{ $employee->phone }}
                        </div>
                        <div class="form-group">
                            <strong>Photo:</strong>
                            {{ $employee->photo }}
                        </div>
                        <div class="form-group">
                            <strong>Created By:</strong>
                            {{ $employee->created_by }}
                        </div>
                        <div class="form-group">
                            <strong>Modified By:</strong>
                            {{ $employee->modified_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
