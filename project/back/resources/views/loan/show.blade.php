@extends('layouts.app')

@section('template_title')
    {{ $loan->name ?? "{{ __('Show') Loan" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Loan</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('loans.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Client Id:</strong>
                            {{ $loan->client_id }}
                        </div>
                        <div class="form-group">
                            <strong>Amount:</strong>
                            {{ $loan->amount }}
                        </div>
                        <div class="form-group">
                            <strong>Type:</strong>
                            {{ $loan->type }}
                        </div>
                        <div class="form-group">
                            <strong>Remainingamount:</strong>
                            {{ $loan->remainingAmount }}
                        </div>
                        <div class="form-group">
                            <strong>Remainingtime:</strong>
                            {{ $loan->remainingTime }}
                        </div>
                        <div class="form-group">
                            <strong>Dayspastdue:</strong>
                            {{ $loan->daysPastDue }}
                        </div>
                        <div class="form-group">
                            <strong>Created By:</strong>
                            {{ $loan->created_by }}
                        </div>
                        <div class="form-group">
                            <strong>Modified By:</strong>
                            {{ $loan->modified_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
